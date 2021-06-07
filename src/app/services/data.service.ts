import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/interceptors/loader.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  searchItem= new Subject<any>();

  systemUser: any;
  user_id: any;

  downloadURL = [];

  constructor(
    private userservice: UserServiceService,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private loaderService: LoaderService
  ) {}

  async _setActiveUser(userInfo) {
    this.systemUser = userInfo;

    console.log('this is the user info from volatile data', userInfo);
    this.user_id = userInfo.user.uid;
    localStorage.setItem('user', userInfo.user.uid);
  }

  getuserid() {
    return this.user_id;
  }

  setuserid(userid) {
    this.user_id = userid;
  }

  async uploadFile(fileItem, userId) {
    // const filePath = `${this.basePath}/${userId}/${Date.now()}_${fileItem.name}`;
    // const storageRef = this.afStorage.ref(filePath);
    console.log('checking item', fileItem);

    // debugger;
    for (let i = 0; i < fileItem.length; i++) {
      //checking the length of the file
      if (i < fileItem.length) {
        await this.uploadFile2(fileItem[i], userId);
        console.log('check', fileItem[i]);
      } else {
        console.log('done uploading');
      }
    }
  }

  private basePath = 'uploads/worker';
  async uploadFile2(fileItem, userId) {
    const filePath = `${this.basePath}/${userId}/${fileItem.name}`;
    const storageRef = this.afStorage.ref(filePath);
    console.log('loading item ', fileItem);

    // uploading a file to firebase
    await this.afStorage.upload(filePath, fileItem);

    //getting link to the images
    this.downloadURL.push(await storageRef.getDownloadURL().toPromise());
    console.log('url', this.downloadURL);
  }

  //new worker
  async newWorker(worker, images) {
    this.loaderService.setHttpProgressStatus(true);
    let _userid = localStorage.getItem('user');
    this.afs
      .collection('Users')
      .doc(_userid)
      .update({ isWorker: true })
      .then((res) => {
        //  console.log("wokerimages", images);
        this.afs
          .collection('Users')
          .doc(_userid)
          .update({ skill: worker })
          .then((workerres) => {
            this.uploadFile(images, _userid).then((res1) => {
              this.afs
                .collection('Users')
                .doc(_userid)
                .update({
                  ['skill.Wokerimages']: this.downloadURL,
                });
              console.log('wokerresponse', res1);
              this.loaderService.setHttpProgressStatus(false);

              //clearing the link that holds the url
              this.downloadURL = [];
            });
            console.log('setting worker field successful', workerres);
          })
          .catch((err) => {
            console.log('error occured at setting up worker field', err);
          });

        console.log('success of setting a user to true', res);
      })
      .catch((res) => {
        console.log('err occured setting a user to true', res);
      });
  }

  //workerdetails
  workerDetails(uid) {
    return this.afs.collection('Users').doc(uid).valueChanges();
  }

  //search worker
  search(searchParam:string){
    this.searchItem.next(searchParam);
  }
}
