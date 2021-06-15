import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {


  workerDetails= new BehaviorSubject<any>({});
  constructor(
    private afs: AngularFirestore
  ) {

   }

   //Getting all workers
  getallwokers(){
  return this.afs.collection('Users',ref => ref.where("isWorker", "==", true)).valueChanges();

}

  //selecting a particular worker
  selectedwoker(workerdetails){
    this.workerDetails.next(workerdetails)
  }

  //reloading a worker details
  _detailsWorker(workerid){
    return this.afs.collection('Users').doc(workerid).get();
  }

}
