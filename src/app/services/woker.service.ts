import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  //for holding the id of the user whose project is being viewed
  useridproject= new BehaviorSubject<any>({});

  workerDetails= new BehaviorSubject<any>({});
  constructor(
    private afs: AngularFirestore
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
}



