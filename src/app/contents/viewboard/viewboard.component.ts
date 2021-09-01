import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DataService } from 'src/app/services/data.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WorkerService } from 'src/app/services/woker.service';

@Component({
  selector: 'app-viewboard',
  templateUrl: './viewboard.component.html',
  styleUrls: ['./viewboard.component.scss']
})
export class ViewboardComponent implements OnInit {

  @ViewChild('Listname') nameInputRef: ElementRef;
  @ViewChild('Cardname') CardName: ElementRef;
  @ViewChild('changeListname') changeListname: ElementRef;

  _projects: any;
  backgrounimage;
  _projectid;
  // newcard=true;
  listname=true;
  Tittle= 'tittle'?? "";
  card="";

  private useridproject;

  hooks:any;
  hooks2:any;

  listoftasks=[];
  MainTaskindex: any;
  Subtaskindex: any;
  _userId: any;
  user: any;

  constructor(private projectservice: ProjectService,
    private activatedroute: ActivatedRoute,
    private userservice: UserServiceService,
    private dataservice:DataService,
    private workerservice:WorkerService,
    private _service: NotificationsService,
    ) {
      this.workerservice.useridproject.subscribe(id=>{
        console.log("user id of the viewed project", id)
        this.useridproject=id;
      });
    }

  ngOnInit(): void {



    this.activatedroute.params.subscribe((params) => {
      console.log('these are the activated route', params);
       this._projectid = params['projectId'];
       this.useridproject=params['userid']
      console.log('projectId',params);
      this.projectservice.userproject(this._projectid,this.useridproject).subscribe((results:any) => {
        console.log('these are the results', results);
        this._projects = results;
        this.listoftasks=this._projects.Tasks;
        console.log("list of tasks", this.listoftasks);
      });
    });


    this._userId= this.dataservice.getuserid();
    //getting the current user id
    this.user=this.userservice.getActiveUser(this.dataservice.getuserid()).subscribe(res=>{
      this.user=res;
      console.log("user", this.user.user.firstName)
    });

     //hooks
 this.hooks= this.listoftasks.map(i=>true);
 this.hooks2= this.listoftasks.map(i=>true);
  }

   //adding a new list
   Addlist(){
    // this.listoftasks.push({taskname:'',Task:[]});
    document.getElementById('newTasklist').style.display="block";
    console.log("clicked");
  }

  //for the name of the list
  toggle(){
    this.listname=!this.listname;
    console.log('clicked');
  }

  //for adding a fresh task list
  onaddlistname(){
    console.log('title', this.nameInputRef.nativeElement.value);
    this.Tittle= this.nameInputRef.nativeElement.value;
    this.projectservice.newtask(this.Tittle, this._projectid);
    document.getElementById('newTasklist').style.display="none";
    this.toggle();
  }

  //for changing a list name
  onlistname(i){
     console.log(' change title', this.changeListname.nativeElement.value);
     for (let index = 0; index < this.listoftasks.length; index++) {
            if(index==i)       {
              this.listoftasks[i].taskname = this.changeListname.nativeElement.value;
              console.log("new name",this.listoftasks[i].taskname);
              console.log("entire list", this.listoftasks);
              this.projectservice.UpdateTasksworkers(this.listoftasks, this._projectid,this.useridproject);
              this.hooks[index]=false;
            }
     }

  }

// delete card worker
deletecard(card,indexofcard,indexoflistoflistoftasks){
  // console.log("carfty index",card, indexofcard,indexoflistoflistoftasks)
  this.projectservice.deletecardonlistworker(card, indexofcard,indexoflistoflistoftasks, this.listoftasks, this._projectid, this.useridproject);
}

  toggle3(index){

    console.log(index);
      for (let i = 0; i < this.hooks.length; i++) {
        if(i == index){
          this.hooks[index]= true;
          this.hooks2[i]=false;
        }else{
          this.hooks[i]=false;
          this.hooks2[i]=false;

        }
      }
     this.hooks[index] = true;

     console.log("add tittle", this.hooks[index])
    console.log("index of the titl",index)
  }
//deleteing a task
deletelist(i){
  let deletelist=this.listoftasks[i];
  for (let index = 0; index < this.listoftasks.length; index++) {
    if(i==index){
      console.log("index of the item to be deleted",i);
      this.listoftasks.splice(i,1)
      this.projectservice.UpdateTasksworkers(this.listoftasks, this._projectid,this.useridproject);

    }
  }
}
//for adding a card to the list of a task
  Addcard(index) {
    console.log("index of the card",index);
      for (let i = 0; i < this.hooks2.length; i++) {
        if(i == index){
          this.hooks[i]= false;
          this.hooks2[i]=true;

        }else{
          this.hooks2[i]=false;
          this.hooks[i]=false;
          // this.hooks2[i]=false;
        }
      }
      this.hooks2[index]=true;
    }

    //for adding a new card
    oncardname(i){

      console.log(' change card',i, this.CardName.nativeElement.value);
      let cardmessage= this.CardName.nativeElement.value
      this.projectservice.onaddcardworker(this.listoftasks, i,this._projectid,cardmessage,this.useridproject);
      this.hooks2[i]=false;


    }

    //worker uploading image
    uploadimage(a,i){
      this.MainTaskindex=i;
      this.Subtaskindex=a;
      for (let index = 0; index < this.listoftasks[i].task.length; index++) {
        if( index == a){
          console.log('you clicking ' ,a)
          document.getElementById("file-upload5").click();

        }

      }
    }

      //upload event
  onChange(event){
    let file = (event.target as HTMLInputElement).files[0];
    if(file){
      this.projectservice.workerImageUpload(file,this.useridproject,this._projectid,this.MainTaskindex,this.Subtaskindex, this.listoftasks)
    }
  }
    drop(event: CdkDragDrop<string[]>,i) {
      if (event.previousContainer === event.container) {
        console.log('event container', event.container)
        moveItemInArray(this.listoftasks[i].task, event.previousIndex, event.currentIndex);
        this.projectservice.UpdateTasksworkers(this.listoftasks,this._projectid,this.useridproject);

      } else {
        if(this.listoftasks[i].taskname==='Review'){
          this._service.error('Error','Card can only be moved by Admin',{
            position:['bottom','right'],
            timeOut: 4000,
            animate: 'fade',
            showProgressBar:true
          })
        }else if(
          this.listoftasks[i].task[event.currentIndex].assignedto.toLowerCase() != this.user.user.skill.name.toLowerCase()
        ){
          this._service.error('Error','Please move the card assigned to you',{
            position:['bottom','right'],
            timeOut: 4000,
            animate: 'fade',
            showProgressBar:true
          })
        }else{
          transferArrayItem( this.listoftasks[i-1].task,//previous container
            this.listoftasks[i].task,//container
            event.previousIndex,
            event.currentIndex);
            this.projectservice.UpdateTasksworkers(this.listoftasks,this._projectid,this.useridproject);
            console.log('event previous container', event.previousContainer.data)
        }


      }
    }

}
