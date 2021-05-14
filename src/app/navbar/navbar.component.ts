import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogOut(){
    this.auth.SignOut().then(()=>{
      localStorage.clear();
      this.router.navigate(["login"]);}
    );
    console.log("i work")
  }

  onChange($event){

  }
  reset(){

  }

  changeProfile($event){

  }
}
