import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userid=new Subject<any>();

  constructor(public afAuth:AngularFireAuth) {
    //listening to changes when user is logged in or not
    // this.afAuth.onAuthStateChanged(user=>{
    //   if(user){
    //     console.log("user logged in",user);
    //     this.userid.next(user.uid)
    //   }
    //   else{
    //     console.log("user logged out")
    //   }
    // })
   }

  //create a user account
  signUp(email, password){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
        .then(result=>
           {console.log("user created successfully",result)
          return result;
        }
        )
        .catch((error)=>{
          console.log("An error occured",error.code);
          return error.code;

        });
  }

  //sigin
  SignIn(email,password){
    return this.afAuth.signInWithEmailAndPassword(email,password).then(result=>{
      return result;
    });
  }

  //signout
  SignOut(){
    return this.afAuth.signOut();
  }

  //reset passwoerd
  ResetPassword(email){
    return this.afAuth.sendPasswordResetEmail(email);
  }

  // //getting user id if loggin in
  // getUserid(){
  //   this.userid;
  // }

  isLoggedIn() : boolean {
    console.log("CURRENT USER",localStorage.getItem("user"));
    if(localStorage.getItem("user")) return true;
    else return false;
  }

}
