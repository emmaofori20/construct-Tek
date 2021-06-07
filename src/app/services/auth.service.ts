import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoaderService } from 'src/interceptors/loader.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth:AngularFireAuth,private loaderService: LoaderService) {

   }

  //create a user account
  signUp(email, password){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
        .then(result=>{
          this.loaderService.setHttpProgressStatus(true);

           {console.log("user created successfully",result)
           this.loaderService.setHttpProgressStatus(false);
          return result;
        }
        }
        )
        .catch((error)=>{
          console.log("An error occured",error.code);
          this.loaderService.setHttpProgressStatus(false);

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

  isLoggedIn() : boolean {
    console.log("CURRENT USER",localStorage.getItem("user"));
    if(localStorage.getItem("user")) return true;
    else return false;
  }

}
