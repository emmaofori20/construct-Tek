import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ConnectionService } from 'ng-connection-service';
import { LoaderService } from 'src/interceptors/loader.service';
import { DataService } from './services/data.service';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'construct-tek';
  user: any;

  isConnected = true;
  noInternetConnection: boolean;


  constructor(private loaderService: LoaderService,
    private renderer: Renderer2,
    private router: Router,
    private dataservice: DataService,
    private connectionService: ConnectionService,
    private _service: NotificationsService,
  ) {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.renderer.addClass(document.body, 'busy');
      } else {
        this.renderer.removeClass(document.body, 'busy');
      }
    });

    this.CheckingUser();

    //Checking internet connection
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.noInternetConnection=false;
        this._service.success('Success','Internet access',{
          position:['bottom','right'],
          timeOut: 4000,
          animate: 'fade',
          showProgressBar:true
        })
      }
      else {
        this.noInternetConnection=true;
        this._service.error('Error','No internet connection',{
          position:['bottom','right'],
          timeOut: 4000,
          animate: 'fade',
          showProgressBar:true
        })
      }
    })


  }

  async CheckingUser() {
    let _user = localStorage.getItem("user");
    // this.dataservice.setuserid(_user);
    if (!_user) {
      //this.router.navigate(["login"]);
      if (!window.location.href.includes("not-found") && (window.location.href.includes("login") || window.location.href.includes("SignUp")))
        // this.dataservice.setuserid(_user);
        console.log("user", _user);
      this.router.navigate(["welcome"]);
      console.log("no user");
    }
    else {
      // console.log("user", _user);
      this.dataservice.setuserid(_user);
      // await this.dataservice._setActiveUser(_user);

      // this.router.navigate(['home-page'])

    }
  }
}
