import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
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
  user:any;
  constructor(private loaderService: LoaderService,
    private renderer:Renderer2,
    private router:Router,
    private dataservice:DataService
    ){
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.renderer.addClass(document.body, 'busy');
      } else {
        this.renderer.removeClass(document.body, 'busy');
      }
    });

    this.CheckingUser();
  }

  async CheckingUser() {
    let _user = localStorage.getItem("user");
    // this.dataservice.setuserid(_user);
    if (!_user) {
      //this.router.navigate(["login"]);
      if (!window.location.href.includes("not-found") && (window.location.href.includes("login") || window.location.href.includes("SignUp")))
      // this.dataservice.setuserid(_user);
      console.log("user", _user);
      this.router.navigate(["login"]);
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
