import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { project } from '../model/model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  _userid:any;
  randomColor
  constructor(private afs: AngularFirestore, private data : DataService) {
    this._userid=this.data.getuserid();
    this.randomColor = Math.floor(Math.random()*16777215).toString(16);

   }

  //creating a new project
  async newproject(name, description){

    let project:project={
      name: name,
      description:description,
      tasks:0,
      workers:0,
      color:'#'+ this.randomColor
    }

    console.log("created projects", project);
   await this.afs.collection('Users').doc(this._userid).collection('Projects').add({project}).then((docRef)=> {
     //setting project id
    this.afs.collection('Users').doc(this._userid).collection('Projects').doc(docRef.id).set({'projectId': docRef.id, project})
    console.log("Document written with ID: ", docRef.id);

  }
   )
}


  //getting all projects belonging to a user
  getUserproject(){
    return this.afs.collection('Users').doc(this._userid).collection('Projects').valueChanges();;
  }
}
