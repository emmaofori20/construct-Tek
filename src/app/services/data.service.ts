import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  systemUser: any;
  user_id: any;

  constructor(private userservice : UserServiceService) {

  }

  async _setActiveUser(userInfo){
    this.systemUser =  userInfo;

    console.log("this is the user info from volatile data",userInfo);
    this.user_id =(userInfo.user.uid);
    localStorage.setItem("user", userInfo.user.uid);
  }

  getuserid(){
    return this.user_id;
  }

  setuserid(userid){
    this.user_id=userid;
  }
}
