import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Card, project, Task } from '../model/model';
import { DataService } from './data.service';
import { UserServiceService } from './user-service.service';


@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private arrayUnion = firebase.default.firestore.FieldValue.arrayUnion;

  _userid: any;
  randomColor;
  backgroundImage = [
    '../../../assets/image1.jpg',
    '../../../assets/image2.jpg',
    '../../../assets/image3.jpg',
    '../../../assets/image4.jpg',
    '../../../assets/image1.jpg',
  ];
  image;
  project = new BehaviorSubject<any>({});
  Userid = localStorage.getItem('user');
  username;

  constructor(
    private afs: AngularFirestore,
    private data: DataService,
    private userservice: UserServiceService
  ) {
    this._userid = this.data.getuserid();
    this.randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.image = Math.floor(Math.random() * 5);

    //getting the user details
    this.userservice.getActiveUser(this.Userid).subscribe((res: any) => {
      console.log(res);
      this.username = res.lastName;
    });
  }

  //creating a new project
  async newproject(name, description) {
    let project: project = {
      name: name,
      description: description,
      tasks: 0,
      workers: 0,
      color: '#' + this.randomColor,
    };

    // seeting a default task

    let task:Task= {
      taskname: 'New task',
      task: [
        {
          issuedby: 'user',
          assignedto: 'worker',
          task: 'my first task',
          img: '',
        },
      ],
    };
    console.log('background image', this.backgroundImage[this.image]);
    console.log('created projects', project);
    await this.afs
      .collection('Users')
      .doc(this._userid)
      .collection('Projects')
      .add({ project })
      .then((docRef) => {
        //setting project id
        this.afs
          .collection('Users')
          .doc(this._userid)
          .collection('Projects')
          .doc(docRef.id)
          .set({
            projectId: docRef.id,
            project,
            Tasks: [task],
            backgroundImage: this.backgroundImage[this.image],
          });
        console.log('Document written with ID: ', docRef.id);
        this.image = 0;
      });
  }

  //getting all projects belonging to a user
  getUserproject() {
    let Userid = localStorage.getItem('user');
    return this.afs
      .collection('Users')
      .doc(Userid)
      .collection('Projects')
      .valueChanges();
  }

  //loadparticular project
  oneproject(item) {
    this.project.next(item);
  }

  //getting a project
  userproject(projectId) {
    let Userid = localStorage.getItem('user');
    return this.afs
      .collection('Users')
      .doc(Userid)
      .collection('Projects')
      .doc(projectId)
      .valueChanges();
  }
  //for a new Task
  async newtask(taskname, projectid) {
    // let _card: Card = {
    //   issuedby: this.username,
    //   assignedto: ' ',
    //   task: card,
    //   img: ' ',
    // };
    let task: Task = {
      taskname: taskname,
      task: [],
    };

    console.log('Username', this.username);
    console.log('The new task', task);
    console.log('projectid', projectid);

    let taskass= this.afs
      .collection('Users')
      .doc(this.Userid)
      .collection('Projects')
      .doc(projectid);
    console.log("task",taskass.update({Tasks: this.arrayUnion(task)}));
  }

  //getting all the tasks of a particular project
  allTasksofproject(projectid) {
    // return this.afs.collection('Users').doc(this.Userid).collection('Projects').doc(projectid).get();
  }
}
