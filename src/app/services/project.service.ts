import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { project } from '../model/model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  _userid:any;
  randomColor;
  backgroundImage=['../../../assets/image1.jpg','../../../assets/image2.jpg','../../../assets/image3.jpg','../../../assets/image4.jpg','../../../assets/image1.jpg'];
  image;
 project=new BehaviorSubject<any>({});

  constructor(private afs: AngularFirestore, private data : DataService) {
    this._userid=this.data.getuserid();
    this.randomColor = Math.floor(Math.random()*16777215).toString(16);
    this.image=Math.floor(Math.random()*5);

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

    console.log("background image", this.backgroundImage[this.image])
    console.log("created projects", project);
   await this.afs.collection('Users').doc(this._userid).collection('Projects').add({ project }).then((docRef)=> {
     //setting project id
    this.afs.collection('Users').doc(this._userid).collection('Projects').doc(docRef.id).set({'projectId': docRef.id, project, tasks: 'null', backgroundImage: this.backgroundImage[this.image]})
    console.log("Document written with ID: ", docRef.id);
    this.image=0;

  }
   )
}


  //getting all projects belonging to a user
  getUserproject(){
    let Userid = localStorage.getItem("user");
    return this.afs.collection('Users').doc(Userid).collection('Projects').valueChanges();;
  }

  //loadparticular project
  oneproject(item){
    this.project.next(item);
  }

  //getting a project
  userproject(projectId){
    let Userid = localStorage.getItem("user");
    return this.afs.collection('Users').doc(Userid).collection('Projects').doc(projectId).get();
  }
}
