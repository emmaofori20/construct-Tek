import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { Card, project, Task } from '../model/model';
import { DataService } from './data.service';
import { UserServiceService } from './user-service.service';


@Injectable({
  providedIn: 'root',
})
export class ProjectService {



  private arrayUnion = firebase.default.firestore.FieldValue.arrayUnion;
  private arrayRemove = firebase.default.firestore.FieldValue.arrayRemove;

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
      // console.log(res);
      this.username = res.user.lastName;
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
    console.log('user id', this._userid)
    this.afs
      .collection('Users')
      .doc(this._userid)
      .collection('Projects')
      .add({ project })
      .then(async (docRef) => {
        //setting project id
        await this.afs
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
      }).catch(res=>{
        console.log("error occured",res)
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
  userproject(projectId, userid) {
    return this.afs
      .collection('Users')
      .doc(userid)
      .collection('Projects')
      .doc(projectId)
      .valueChanges();
  }

  //for a new Task
  async newtask(taskname, projectid) {

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
    taskass.update({Tasks: this.arrayUnion(task)});
  }
//deleting a list
  deletetask(i,task, projectid){
  console.log('task',task)
  this.afs
  .collection('Users')
  .doc(this.Userid)
  .collection('Projects')
  .doc(projectid).update({Task : this.arrayRemove(task.taskname)});
}
//adding a card
  onaddcard(listoftasks,index, projectid,cardmessage){
  let _listoftasks=listoftasks
let card:Card={
  issuedby:this.username,
  assignedto:"",
  task: cardmessage,
  img:""
}
for (let i = 0; i < listoftasks.length; i++) {
  if(index==i)  {
    // _listoftasks[i].task= _listoftasks.task[i].push(card);
    console.log("updated task in firebase", _listoftasks[i].task.push(card))
    console.log("updated task in firebase222", _listoftasks)

    this.UpdateTasks(_listoftasks,projectid);

  }
}

}

//delete card
  deletecardonlist(card,indexofcard, indexoflistoflistoftasks,listoftasks, projectid){

  console.log("cliked",  listoftasks[indexoflistoflistoftasks].task)
  for (let index = 0; index < listoftasks[indexoflistoflistoftasks].task.length; index++) {
          if( index == indexofcard){
            console.log("card and index", index, listoftasks[indexoflistoflistoftasks].task)
            listoftasks[indexoflistoflistoftasks].task.splice(index,1);
            this.UpdateTasks(listoftasks,projectid);
          }

  }
}

//updating tasks
  UpdateTasks(updatedtasks:any, projectId){
  let updatetask=this.afs.collection('Users').doc(this.Userid).collection('Projects').doc(projectId);
  // updatetask.update({Tasks: updatedtasks });
  console.log("the tasks", updatedtasks);
  updatetask.update({'Tasks': updatedtasks})
}

//adding a worker to your project
  addworker( projectid,workerid){
    let Userid = localStorage.getItem('user');
    console.log("wokerid and projectid", projectid,workerid)
    this.afs
      .collection('Users')
      .doc(Userid)
      .collection('Projects')
      .doc(projectid)
      .update({
       Teams : this.arrayUnion(workerid)

      })

  }

//assigning a project to a worker
  assignproject(workerid, userprojectid){
    let userid = localStorage.getItem('user')
    console.log('workerid:', workerid, "userprojectid:", userprojectid)
    this.afs.collection('Users').doc(workerid).collection("AssignedProjects").doc(userprojectid).set({userprojectid,'userid': userid});
  }

//deleting a project
  deleteproject(projectid){
  console.log("the delete project id", projectid);
  this.afs.collection('Users').doc(this.Userid).collection('Projects').doc(projectid).delete();
}

//get project to edit
  _editproject(){

}

//editting a project
  editproject(projectid){
console.log('the id of the project to be editted', projectid);
// this.afs.collection('Users').doc(this.Userid).collection('Projects').doc(projectid).update({

// });
}
}
