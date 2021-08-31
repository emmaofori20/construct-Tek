import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NotificationsService } from 'angular2-notifications';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
    private userservice: UserServiceService,
    private afStorage: AngularFireStorage,
    private _service: NotificationsService,

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
      projectProgress: '0'
    };

    // seeting a default task
    let task:Task= {
      taskname: 'Negotiation',
      task: [
        {
          issuedby: 'user',
          assignedto: 'worker',
          task: 'my first task',
          img: '',
        },
      ],
    };
    let task1:Task= {
      taskname: 'Inprogress',
      task: [
        // {
        //   issuedby: 'user',
        //   assignedto: 'worker',
        //   task: 'my first task',
        //   img: '',
        // },
      ],
    };
    let task2:Task= {
      taskname: 'Completed',
      task: [
        // {
        //   // issuedby: 'user',
        //   // assignedto: 'worker',
        //   // task: 'my first task',
        //   // img: '',
        // },
      ],
    };
    let task3:Task= {
      taskname: 'Review',
      task: [
        // {
        //   issuedby: 'user',
        //   assignedto: 'worker',
        //   task: 'my first task',
        //   img: '',
        // },
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
            Tasks: [task,task1,task2,task3],
            backgroundImage: this.backgroundImage[this.image],
            'isProjectComplete': false
          });
        console.log('Document written with ID: ', docRef.id);
        this.image = 0;
        this._service.success('Success','Project created',{
          position:['bottom','right'],
          timeOut: 4000,
          animate: 'fade',
          showProgressBar:true
        })
      }).catch(res=>{
        console.log("error occured",res)
        this._service.error('Error','An error occured',{
          position:['bottom','right'],
          timeOut: 4000,
          animate: 'fade',
          showProgressBar:true
        })
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

//worker addding a card
onaddcardworker(listoftasks,index, projectid,cardmessage,userid){
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

    this.UpdateTasksworkers(_listoftasks,projectid,userid);

  }
}

}

//delete card user
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

//worker deleting tasks on a list
deletecardonlistworker(card,indexofcard, indexoflistoflistoftasks,listoftasks, projectid,userid){
  console.log("cliked",  listoftasks[indexoflistoflistoftasks].task);
    debugger;
  for (let index = 0; index < listoftasks[indexoflistoflistoftasks].task.length; index++) {
          if( index == indexofcard){
            console.log("card and index", index, listoftasks[indexoflistoflistoftasks].task)
            listoftasks[indexoflistoflistoftasks].task.splice(index,1);
            this.UpdateTasksworkers(listoftasks,projectid,userid);

          }

  }
}

//updating tasks
 async UpdateTasks(updatedtasks:any, projectId){
  let updatetask=this.afs.collection('Users').doc(this.Userid).collection('Projects').doc(projectId);
  // updatetask.update({Tasks: updatedtasks });
  console.log("the tasks", updatedtasks);
  updatetask.update({'Tasks': updatedtasks})

  //measureing progress
  let indexvalue;
  let alltask
  await this.afs.collection("Users").doc(this.Userid).collection('Projects').doc(projectId).get().subscribe(async(res:any)=>{
    console.log('the dtata recieved', res.data().Tasks);
    indexvalue=res.data().indexedValue;
    alltask= res.data().Tasks;

    //calculate progresss
   let Projectprogress=await this.subtaskcalc(indexvalue,alltask);

    await this.afs.collection("Users").doc(this.Userid).collection('Projects').doc(projectId).update({
      'project.projectProgress': Math.round(Projectprogress)
    })

    //Checking to see if progress is 100 percent
    if( Math.round(Projectprogress)==100){
      this.afs.collection("Users").doc(this.Userid).collection('Projects').doc(projectId).update({
        'isProjectComplete': true,
        'OnSetmeasure':false
      })
    }else{

    }


  })
}

//update task for teh workers
async UpdateTasksworkers(updatedtasks:any, projectId, userid){
  let updatetask=this.afs.collection('Users').doc(userid).collection('Projects').doc(projectId);
  // updatetask.update({Tasks: updatedtasks });
  console.log("the tasks", updatedtasks);
  updatetask.update({'Tasks': updatedtasks})

  //measureing progress
  let indexvalue;
  let alltask
  await this.afs.collection("Users").doc(userid).collection('Projects').doc(projectId).get().subscribe(async(res:any)=>{
    console.log('the dtata recieved', res.data().Tasks);
    indexvalue=res.data().indexedValue;
    alltask= res.data().Tasks;

    //calculate progresss
   let Projectprogress=await this.subtaskcalc(indexvalue,alltask);

    await this.afs.collection("Users").doc(this.Userid).collection('Projects').doc(projectId).update({
      'project.projectProgress': Math.round(Projectprogress)
    })


  })
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
  editproject(projectid, name,description){
console.log('Recieved project data', projectid, name, description, this.Userid);
this.afs.collection('Users').doc(this.Userid).collection('Projects').doc(projectid).update({
  'project.name' : name,
}).then((res:any)=>{
  this.afs.collection('Users').doc(this.Userid).collection('Projects').doc(projectid).update({
    'project.description': description
  })

  this._service.success('Success','Upated',{
    position:['bottom','right'],
    timeOut: 4000,
    animate: 'fade',
    showProgressBar:true
  })
});

}

//setting image in a task
 //user/worker uploading an image
 workerImageUpload(file, userid, projectId, maintaskindex, subtaskindex, listoftasks) {
  this.uploadFile(file, userid, projectId,maintaskindex,subtaskindex,listoftasks);
  console.log('some file', file,"main tasks index",maintaskindex,"sub tasks index", subtaskindex,"list of task", listoftasks );
}

// upload file
private basePath = 'uploads/projectImages';
async uploadFile(
  fileItem,
  userid,
  projectId,
  maintaskindex,
  substaskindex,
  listoftasks //: Observable<number>
) {
  const filePath = `${this.basePath}/${userid}/${projectId}/${fileItem.name}/`;
  const storageRef = this.afStorage.ref(filePath);
  const uploadTask = this.afStorage.upload(filePath, fileItem);
  let __listoftasks:any= listoftasks;

  uploadTask
    .snapshotChanges()
    .pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL) => {
          console.log('File available at', downloadURL);
          for (let index = 0; index < __listoftasks[maintaskindex].task.length; index++) {
            if( index == substaskindex){
              console.log("card and index", index, __listoftasks[maintaskindex].task[substaskindex].img=downloadURL)
              this.UpdateTasksworkers(__listoftasks,projectId,userid);
            }

        }
        });
      })
    )
    .subscribe();
}

//assigning tasks to a worker
AssignTasktoWorker(workername, userid, projectid, mainindex, subtaskindex, listoftasks){
  let __listoftasks:any= listoftasks;

  for (let index = 0; index < __listoftasks[mainindex].task.length; index++) {
    if( index == subtaskindex){
      console.log("card and index", index, __listoftasks[mainindex].task[subtaskindex].assignedto=workername)
      this.UpdateTasks(__listoftasks,projectid);
    }

}
}

//calculating the number of sub tasks in the list
subtaskcalc(index, listoftasks){
console.log('the list of the task', listoftasks, 'index cal', index);
//the variable is for the number of task on the set measure list
let y:any= listoftasks[index].task.length
console.log('the why thing', y)

//variable y is for the total number of task on the bord
let x:any=0;
for (let superindex = 0; superindex < listoftasks.length; superindex++) {
  console.log('the index reached',superindex)
  console.log('he  sdnkndkns', x=x+listoftasks[superindex].task.length)
}


let total= (y/x)*100;

console.log('teh final total', total)
return(total);
}

 //check if project is complete
_checkifcomplete(projectprogress, projectcomplete){
  if(projectprogress==100){

  }
    // this.rate=true

  console.log('tracking progress',projectprogress,projectcomplete)
}


}
