import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user:any;
  _userId;
  constructor(private auth:AuthService, private router: Router, private userservice: UserServiceService, private dataservice:DataService) {

    this._userId= this.dataservice.getuserid();
    //getting the current user id
    this.user=this.userservice.getActiveUser(this.dataservice.getuserid()).subscribe(res=>{
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

  changeProfile(e){
    console.log(e);
    document.getElementById("file-upload").click();
  }

  onChange(event){
    let file = (event.target as HTMLInputElement).files[0];
    if(file){
      this.userservice.UserProfilePhoto(file,this._userId);
    }
  }
  reset(){

  }


}
