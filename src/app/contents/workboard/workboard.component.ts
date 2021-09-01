import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoaderService } from 'src/interceptors/loader.service';
// import { MatCardHarness } from '@angular/material/card/testing';
// import { Task} from 'src/app/model/model';

@Component({
  selector: 'app-workboard',
  templateUrl: './workboard.component.html',
  styleUrls: ['./workboard.component.scss'],
})
export class WorkboardComponent implements OnInit {
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

  hooks:any;
  hooks2:any;
  Team:any[]=[];//varaible for the team
  rate=false;// for calling the rateing modal
  listoftasks=[];

  //variable for teh team id's
  TeamId=[];

  //the number of subtasks
  numbersubtask;

  MainTaskindex:any;
  Subtaskindex:any;

  //for  checking if project is complted
  projectmeasure;
  projectprogress;



  modalstate:boolean;

  constructor(
    private projectservice: ProjectService,
    private activatedroute: ActivatedRoute,
    private afs:AngularFirestore,
    private loaderService: LoaderService,

  ) {
  }

  ngOnInit(): void {
    this.loaderService.setHttpProgressStatus(true);
      let Userid = localStorage.getItem('user');
    //getting a project data after reloading
      this.activatedroute.params.subscribe((params) => {
      console.log('these are the activated route', params);
      this._projectid = params['projectId'];
      console.log('projectId',this._projectid);
      this.projectservice.userproject(this._projectid,Userid).subscribe((results:any) => {
        console.log('these are the results', results);
        this.projectmeasure=results.OnSetmeasure;
        this.projectprogress=results.isProjectComplete;
        // this.checkifcomplete(this.projectprogress,this.projectcomplete)

        this._projects = results;
        this.listoftasks=this._projects.Tasks;
        console.log("all the task", this.listoftasks);
        this.check();
        this.loaderService.setHttpProgressStatus(false);

        //laoding the team members
        if(results.Teams!=null){
         this.loadTeamMembers(results.Teams);
        }else{

        }

      });
    });

     //hooks
     this.hooks= this.listoftasks.map(i=>true);
     this.hooks2= this.listoftasks.map(i=>true);

  }

  //loading the team
loadTeamMembers(TeamMembers:any){
  let members=[];
  this.Team=[]

  for (let i = 0; i < TeamMembers.length; i++) {
   this.afs.collection('Users').doc(TeamMembers[i]).get().subscribe((results)=>{
     members.push(results.data())
     this.Team.push(results.data())
     console.log("members of the team", members)
     console.log("membersssssss of the team", this.Team)
   });
  };

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
              this.projectservice.UpdateTasks(this.listoftasks, this._projectid);
              this.hooks[index]=false;
            }
     }

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
      this.projectservice.UpdateTasks(this.listoftasks, this._projectid);

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
      this.projectservice.onaddcard(this.listoftasks, i,this._projectid,cardmessage);
      this.hooks2[i]=false;


  }

  //deleteing a card from a list
  deletecard(card,indexofcard,indexoflistoflistoftasks){
      // console.log("carfty index",card, indexofcard,indexoflistoflistoftasks)
      this.projectservice.deletecardonlist(card, indexofcard,indexoflistoflistoftasks, this.listoftasks, this._projectid);
  }

  //uploading image unto a compledted task
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
    let Userid = localStorage.getItem('user');
    let file = (event.target as HTMLInputElement).files[0];
    if(file){
      this.projectservice.workerImageUpload(file,Userid,this._projectid,this.MainTaskindex,this.Subtaskindex, this.listoftasks)
    }
  }


  //assigntask to team members
  assigntaskmodal(a,i){
    this.MainTaskindex=i;
    this.Subtaskindex=a;
    this.modalstate=true
  }

  onBack(value){
    this.modalstate=false;
  }

  assigntask(item){
    let WorkerName= item.user.skill.name;
    let Userid = localStorage.getItem('user');

   this.projectservice.AssignTasktoWorker(WorkerName,Userid,this._projectid,this.MainTaskindex,this.Subtaskindex,this.listoftasks);
   this.modalstate=false
  }

  //setting a meaure to track the progress of the report
  setmeasure(index){
    let indexTosetMeasure=index;
    let Userid = localStorage.getItem('user');
    console.log('the index to set measure', indexTosetMeasure);
    this.afs.collection("Users").doc(Userid).collection('Projects').doc(this._projectid).update({
      'OnSetmeasure':true,
      'indexedValue': index
    });
    document.getElementById('elemtrack').style.display='flex';
    //calculating the subtasks
    this.numbersubtask=this.projectservice.subtaskcalc(index, this.listoftasks);
    console.log("the progress", this.numbersubtask);
  }
  // unsettting the measure
  unsetmeasure(index){
    let indexTosetMeasure=index;
    document.getElementById('elemtrack').style.display='none';
    let Userid = localStorage.getItem('user');
    console.log('the index to set measure', indexTosetMeasure);
    this.afs.collection("Users").doc(Userid).collection('Projects').doc(this._projectid).update({
      'OnSetmeasure':false,
      'indexedValue': null

    });
  }

  drop(event: CdkDragDrop<string[]>,i) {
      if (event.previousContainer === event.container) {
        console.log('event container', event.container)
        moveItemInArray(this.listoftasks[i].task, event.previousIndex, event.currentIndex);
        this.projectservice.UpdateTasks(this.listoftasks, this._projectid);

      } else {
        transferArrayItem( this.listoftasks[i-1].task,//previous container
                          this.listoftasks[i].task,//container
                          event.previousIndex,
                          event.currentIndex);
                          console.log( 'the name of the current container',  this.listoftasks[i].task, event.currentIndex)
                          // this.checkifcomplete(this.projectprogress,this.projectcomplete)
                          this.checkReview(this.listoftasks[i].taskname,event.currentIndex,this.listoftasks,i);
                          this.projectservice.UpdateTasks(this.listoftasks, this._projectid);
                          // this.check()
                          console.log('event previous container', event.previousContainer.data)

      }
  }

  onModalResult(result: boolean){
    console.log(result);
    this.rate=result;
  }

  checkReview(listname,indexofcard,listoftask,i){
    if(listname==='Review'){
      console.log('review card', listoftask[i].task[indexofcard])
      console.log('list of team memebers',this.Team)
      for (let index = 0; index < this.Team.length; index++) {
        if(this.Team[index].user.skill.name.toLowerCase()===(listoftask[i].task[indexofcard].assignedto.toLowerCase())){
            console.log('ready for review');
            this.projectservice._rateworker(this.Team[index]);
            console.log('the worker to be rated', this.Team[index])
            this.rate=true;
        }else{

        }

      }

    }else{
      console.log('it is not review')
    }
  }
  check(){

    // if(this.projectmeasure==false && this.projectprogress ==true){
    //   console.log('checking if true')
    //   console.log('call modal');
    //   this.rate=true;
    // }else{
    //   this.rate=false
    // }
  }

}
