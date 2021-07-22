import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  //varibles to hold the project we want to leave
  _userIdproject;
  projectid;

  private arrayUnion = firebase.default.firestore.FieldValue.arrayUnion;
  private arrayRemove = firebase.default.firestore.FieldValue.arrayRemove;
  //for holding the id of the user whose project is being viewed
  useridproject= new BehaviorSubject<any>({});

  workerDetails= new BehaviorSubject<any>({});
  downloadURL: any;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
  ) {

   }

   //Getting all workers
  getallwokers(){
  return this.afs.collection('Users',ref => ref.where("user.isWorker", "==", true)).valueChanges();

}

  //selecting a particular worker
  selectedwoker(workerdetails){
    this.workerDetails.next(workerdetails)
  }

  //reloading a worker details
  _detailsWorker(workerid){
    return this.afs.collection('Users').doc(workerid).get();
  }

  //projects assifned to a worker
  assignedprojects(){
    let userid = localStorage.getItem('user')
    return this.afs.collection("Users").doc(userid).collection('AssignedProjects').get();

  }
  //viewing the project assgined to the worker
  viewuserproject(projectId, userid) {
    return this.afs
      .collection('Users')
      .doc(userid)
      .collection('Projects')
      .doc(projectId)
      .valueChanges();
  }

   //viewing a particular project of the user
  viewinguseridproject(userid){
    console.log("the user id", userid)
    this.useridproject.next(userid);
  }

  //deleting an image from the workers profession
  onImagedelete(image){
    let userid = localStorage.getItem('user');
    this.afs.collection('Users').doc(userid).update({
      'user.skill.Wokerimages': this.arrayRemove(image)
    })
  }

  //deleteing a worker profile
  deleteprofile(userid){
    console.log("the deleting user id", userid);
    this.afs.collection('Users').doc(userid).update({
      'user.skill' : null,
      'user.isWorker': false
     })
  }


  //leaving a project
  getdetailsofleaveproject(project){
    console.log('the project',project.projectId)
    let userid = localStorage.getItem('user');
    this.afs.collection('Users').doc(userid).collection('AssignedProjects').doc(project.projectId).get().subscribe(res=>{
      console.log('the leaving data', res.data().userid);
      let __userid=res.data().userid;
      let __projectuserid= res.data().userprojectid;
      this.removeworker(__userid,__projectuserid,userid);
      this.afs.collection('Users').doc(userid).collection('AssignedProjects').doc(project.projectId).delete();

    })
  }

  //removing the worker from the teams
  removeworker(userid,userprojectid,workerid){
    this.afs.collection('Users').doc(userid).collection('Projects').doc(userprojectid).update({
      'Teams': this.arrayRemove(workerid)
    })
  }


  //uploading images to to worker profile
  async uploadFile(fileItem, userId) {
    // debugger;
    console.log('checking item', fileItem);
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

    await this.afs.collection('Users').doc(userId).update({
      'user.skill.Wokerimages': this.arrayUnion(await storageRef.getDownloadURL().toPromise())
    })
    //getting link to the images
    // this.downloadURL.push(await storageRef.getDownloadURL().toPromise());
    console.log('url',await storageRef.getDownloadURL().toPromise());
  }
}



