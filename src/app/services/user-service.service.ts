import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SystemUser, User } from '../model/model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  UsersCollection: any;
  constructor(private auth: AuthService, private afs: AngularFirestore) {
    // this.UsersCollection = afs.collection<User>(sers,ref=> ref.orderBy('dateCreated'));

  }

  newUSer(surname, othernames, email, iswoker, skill, photo, password) {
    //new users
    let user: User = {
      firstName: othernames,
      lastName: surname,
      email: email,
      password: password,
      photo: photo,
      isWorker: iswoker,
      skill: skill,
    };
    //All system users
    let _systemuser: SystemUser = {
      email: user.email,
      Surname: user.lastName,
      FirstName: user.firstName,
    };

    console.log('USer email and', user.email, user.password);

    //sigining up a new user
    return this.auth
      .signUp(user.email, user.password)
      .then((res) => {

      console.log('checking results', res.user.uid);

      //  if email already exist or invalid
      if(res=="auth/email-already-in-use" || res=="auth/invalid-email"){
        return res;
      }

      //adding user to the users collection
      this.afs.collection('Users').doc(res.user.uid).set(user);

      })
      .catch((err) => {
        console.log(err);
      });
  }
}
