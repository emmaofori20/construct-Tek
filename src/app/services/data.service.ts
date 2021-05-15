import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  systemUser: any;
  user_id: any;
  user:any;

  constructor(private userservice : UserServiceService) {

  }

  async _setActiveUser(userInfo){
    this.systemUser =  userInfo;
    console.log("this is the user info from volatile data",userInfo);
    this.user_id = this.userservice.setuser(userInfo.user.uid);
    this.user= await this.userservice.getActiveUser();
    localStorage.setItem("user", JSON.stringify({...this.user}));

  }
}
