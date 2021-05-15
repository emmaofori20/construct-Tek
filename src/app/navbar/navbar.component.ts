import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user:any;
  _userId;
  constructor(private auth:AuthService, private router: Router, private userservice: UserServiceService) {
    //getting the current user id
    this.auth.userid.subscribe(res=>this._userId=res);
    this.user=this.userservice.getActiveUser().subscribe(res=>{
      this.user=res;
      console.log("user details", this.user)
    })

  }

  ngOnInit(): void {
  }
  open(){
    console.log(this.user)
  }

  onLogOut(){
    this.auth.SignOut().then(()=>{
      localStorage.clear();
      this.router.navigate(["login"]);}
    );

  }

  onChange(event){
    let file = (event.target as HTMLInputElement).files[0];
    if(file){
      this.userservice.UserProfilePhoto(file,this._userId);
    }
  }
  reset(){

  }

  changeProfile(e){
    console.log(e);
    document.getElementById("file-upload").click();
  }
}
