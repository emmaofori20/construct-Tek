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

  //for diplaying the name
  onlistname(){
     console.log(' change title', this.changeListname.nativeElement.value);
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

    oncardname(i){

      console.log(' change title',i, this.CardName.nativeElement.value);

    }
  //for toggling the list of the tittle
  // toggle(index) {
  //   console.log(index);
  //   // this.titlevisible = !this.titlevisible;
  //   // console.log('clicked', this.titlevisible);
  //   for (let i = 0; i < this.hooks.length; i++) {
  //     if(i == index){
  //       this.hooks[i]= false;
  //     }else{
  //       this.hooks[i]=true;
  //     }
  //   }
  //  this.hooks[index] = false;

  //  console.log("add tittle", this.hooks[index])
  // }

  // togglecard(index) {
  //   for (let i = 0; i < this.hooks2.length; i++) {
  //     if(i == index){
  //       this.hooks[i]=true;
  //       this.hooks2[i]=!this.hooks2[i]

  //     }else{
  //       this.hooks[i]=true;
  //       this.hooks2[i]=false;
  //     }
  //   }
  //  console.log("add card",this.hooks[index])

  // }

  // //adding the name of a list
  // onlistname(i) {

  //   console.log('title', this.nameInputRef.nativeElement.value);
  //   this.listoftasks[i].taskname="";
  //   this.listtitle = this.nameInputRef.nativeElement.value;
  //   this.hooks[i]=true;

  //   // this.titlevisible = !this.titlevisible;
  // }

  // //adding a card
  // oncardname(i) {
  //   console.log('card name', this.CardName.nativeElement.value,i);
  //   for (let index = 0; index < this.listoftasks.length; index++) {
  //     if (index==i) {
  //      this.listoftasks[i].Task.push({By: 'wisest lore', task: this.CardName.nativeElement.value} );
  //      this.hooks2[i]=false;
  //     }

  //   }
  //   // this.listoftasks.push(this.CardName.nativeElement.value);
  //   // this.Cardvisible = !this.Cardvisible;
  // }




}
