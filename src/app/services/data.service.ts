import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  systemUser: any;
  user_id: any;

  downloadURL;

  constructor(private userservice : UserServiceService, private afs: AngularFirestore, private afStorage: AngularFireStorage,) {

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

  private basePath = "uploads/worker";
  async uploadFile(
    fileItem,
    userId,
  ) {
    const filePath = `${this.basePath}/${userId}/${Date.now()}_${fileItem.name}`;
    const storageRef = this.afStorage.ref(filePath);
    console.log('checking item',fileItem)
    let uploadTask;
    // uploading a file to firebase

    // fileItem.forEach(element => {
    //   this.afStorage.upload(filePath, element);
    // });
    for (let i = 0; i < fileItem.length; i++) {
       uploadTask = this.afStorage.upload(filePath, fileItem[i].name);

       console.log('upload task', uploadTask);

       console.log('index',i)
    }




    // getting the upload progress


    let uploadResult = await uploadTask.snapshotChanges().toPromise();

     await storageRef.getDownloadURL().subscribe(res=>{
       this.downloadURL=res;
       console.log("response", res);
     });

    console.log("File available at", this.downloadURL);

    };



//upload
    // return uploadTask.percentageChanges();


//new worker
 async newWorker(worker, images){

  let _userid = localStorage.getItem("user")
   this.afs.collection('Users').doc(_userid).update({"isWorker": true}).then( res=>{
     console.log("wokerimages", images);
     this.afs.collection('Users').doc(_userid).update({"skill": worker}).then(  workerres=>{
        this.uploadFile(images, _userid).then(res=>{
         this.afs.collection('Users').doc(_userid).update({
          ['skill.Wokerimages']: this.downloadURL
        });
       });
      console.log("worker successful", workerres);

    }).catch(err=>{
      console.log("error occured", err);
    });

    console.log("success", res);

  }).catch(res=>{
    console.log("err", res)
  });
}
}
