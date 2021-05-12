import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth:AngularFireAuth) { }

  //create a user account
  signUp(email, password){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
        .then(result=>
          {console.log("user created successfully",result)
          return result
        }
        )
        .catch((error)=>{
          console.log("An error occured",error.code);
          return error.code;

        });
  }

  //sigin
  SignIn(email,password){
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }

  //signout
  SignOut(){
    return this.afAuth.signOut();
  }

  //reset passwoerd
  ResetPassword(email){
    return this.afAuth.sendPasswordResetEmail(email);
  }

}
