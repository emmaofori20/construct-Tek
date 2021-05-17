import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  user:any;
  _userId;
  constructor(private auth:AuthService, private router: Router, private userservice: UserServiceService, private dataservice:DataService) {

    this._userId= this.dataservice.getuserid();
    //getting the current user id
    this.user=this.userservice.getActiveUser(this.dataservice.getuserid()).subscribe(res=>{
      this.user=res;
    });

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
    e.stopPropagatio();
    console.log(e);
    document.getElementById("file-upload").click();
  }

  onChange(event){
    let file = (event.target as HTMLInputElement).files[0];
    if(file){
      this.userservice.UserProfilePhoto(file,this._userId);
    }
  }


  onDashboard(){
    this.router.navigate(['dashboard'])
  }

  onHompage(){
    this.router.navigate(['home-page'])
  }
}
