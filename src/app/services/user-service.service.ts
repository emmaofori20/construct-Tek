import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/interceptors/loader.service';
import { SystemUser, User } from '../model/model';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  //a variable to hold the user id
  User_id: any;
  //user details
  userdetails: any;
  UsersCollection: any;
  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  //setting up a new user to firebase
  async newUSer(othernames, surname, email, iswoker, photo, password) {
    //new users
    let user: User = {
      firstName: othernames,
      lastName: surname,
      email: email,
      password: password,
      photo: photo,
      isWorker: iswoker,
      skill: null,
    };
    //All system users
    let _systemuser: SystemUser = {
      email: user.email,
      Surname: user.lastName,
      FirstName: user.firstName,
    };

    // console.log('USer email and', user.email, user.password);
    // debugger;
    //sigining up a new user
    this.loaderService.setHttpProgressStatus(true);

    this.auth
      .signUp(user.email, user.password)
      .then((res) => {
        console.log('checking results', res.user.uid);
        //kepping user details
        this.userdetails = user;
        //  if email already exist or invalid
        if (res == 'auth/email-already-in-use' || res == 'auth/invalid-email') {
          return res;
        }

        //adding user to the users collection
        this.afs.collection('Users').doc(res.user.uid).set(user);
        this.router.navigate(['login']);
        // this.loaderService.setHttpProgressStatus(false);
        this.loaderService.setHttpProgressStatus(false);
      })
      .catch((err) => {
        console.log(err);
        this.loaderService.setHttpProgressStatus(false);
      });
  }

  //user uploading an image
  UserProfilePhoto(file, userid) {
    this.uploadFile(file, userid);
    console.log('some file', file);
    this.User_id = userid;
  }

  // upload file
  private basePath = 'uploads/profiles';
  async uploadFile(
    fileItem,
    userid //: Observable<number>
  ) {
    const filePath = `${this.basePath}/${userid}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, fileItem);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            console.log('File available at', downloadURL);
            this.afs
              .collection('Users')
              .doc(userid)
              .update({ photo: downloadURL });
          });
        })
      )
      .subscribe();
  }

  //getting the active user
  getActiveUser(uid) {
    return this.afs.collection('Users').doc(uid).valueChanges();
  }
}
