import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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

  listoftasks=[];
  // titlevisible = true; // for editting the title of the list;
  // Cardvisible = true; //for adding a new todo list;


  constructor(
    private projectservice: ProjectService,
    private activatedroute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    //getting a project data after reloading
    this.activatedroute.params.subscribe((params) => {
      console.log('these are the activated route', params);
       this._projectid = params['projectId'];
      console.log('projectId',this._projectid);
      this.projectservice.userproject(this._projectid).subscribe((results:any) => {
        console.log('these are the results', results);
        this._projects = results;
        this.listoftasks=this._projects.Tasks;
        console.log("list of tasks", this.listoftasks);
      });
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

                          console.log('event previous container', event.previousContainer.data)

      }
    }



}
