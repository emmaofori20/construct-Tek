import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(
    private afs: AngularFirestore
  ) {

   }

   //Getting all workers
  getallwokers(){
  return this.afs.collection('Users',ref => ref.where("isWorker", "==", true)).valueChanges();

}

}
