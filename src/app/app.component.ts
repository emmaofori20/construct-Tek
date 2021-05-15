import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/interceptors/loader.service';

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
    private router:Router
    ){
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.renderer.addClass(document.body, 'busy');
      } else {
        this.renderer.removeClass(document.body, 'busy');
      }
    });


  }

  CheckingUser() {
    let _user = localStorage.getItem("user");
    if (!_user) {
      //this.router.navigate(["login"]);
      if (!window.location.href.includes("not-found"))
        this.router.navigate(["welcome"]);
      console.log("no user");
    } else {
      console.log("user");
      this.user = JSON.parse(_user);
    }
  }
}
