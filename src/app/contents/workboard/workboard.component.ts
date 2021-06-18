import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatCardHarness } from '@angular/material/card/testing';

@Component({
  selector: 'app-workboard',
  templateUrl: './workboard.component.html',
  styleUrls: ['./workboard.component.scss'],
})
export class WorkboardComponent implements OnInit {
  @ViewChild('Listname') nameInputRef: ElementRef;
  @ViewChild('Cardname') CardName: ElementRef;

  _projects: any;
  backgrounimage;



  titlevisible = true; // for editting the title of the list;
  Cardvisible = true; //for adding a new todo list;

  listoftasks = [
    {
      taskname: 'To do list',
      Task: [
        { By: 'wisest lore', task: 'finish code1' },
        { By: 'wisest lore', task: 'finish code2' },
        { By: 'wisest lore', task: 'finish code3' },
        { By: 'wisest lore', task: 'finish code4' },
      ],
    },
    {
      taskname: 'Doing',
      Task: [
        { By: 'wisest lore', task: 'finish code5' },
        { By: 'wisest lore', task: 'finish code6' },
      ],
    },
    {
      taskname: 'Done',
      Task: [
        { By: 'wisest lore', task: 'finish code7' },
        { By: 'wisest lore', task: 'finish code8' },
      ],
    },
  ];
  listtitle = 'Name' ?? ' ';
  hooks: any;
  hooks2:any;

  constructor(
    private projectservice: ProjectService,
    private activatedroute: ActivatedRoute
  ) {
    this.projectservice.project.subscribe((results) => {
      this._projects = results;
      this.backgrounimage = results.backgroundImage;
      console.log('project', results);
    });


    this.hooks = this.listoftasks.map(i=>true);
    this.hooks2 = this.listoftasks.map(i=>false);
  }

  ngOnInit(): void {
    //getting a project data after reloading
    this.activatedroute.params.subscribe((params) => {
      console.log('these are the activated route', params);
      let _projectid = params['projectId'];
      console.log('projectId', _projectid);
      this.projectservice.userproject(_projectid).subscribe((results) => {
        console.log('these are the results', results.data());
        this._projects = results.data();
      });
    });
  }

  //adding a new list
  Addlist(){
    this.listoftasks.push({taskname:'',Task:[]});
  }

  //for toggling the list of the tittle
  toggle(index) {
    console.log(index);
    // this.titlevisible = !this.titlevisible;
    // console.log('clicked', this.titlevisible);
    for (let i = 0; i < this.hooks.length; i++) {
      if(i == index){
        this.hooks[i]= false;
      }else{
        this.hooks[i]=true;
      }
    }
  //  this.hooks[index] = false;

   console.log("add tittle", this.hooks[index])
  }

  togglecard(index) {
    for (let i = 0; i < this.hooks2.length; i++) {
      if(i == index){
        this.hooks[i]=true;
        this.hooks2[i]=!this.hooks2[i]

      }else{
        this.hooks[i]=true;
        this.hooks2[i]=false;
      }
    }
   console.log("add card",this.hooks[index])

  console.log("addcardindex", index)
  }

  //adding the name of a list
  onlistname(i) {

    console.log('title', this.nameInputRef.nativeElement.value);
    this.listoftasks[i].taskname="";
    this.listtitle = this.nameInputRef.nativeElement.value;
    this.hooks[i]=true;

    // this.titlevisible = !this.titlevisible;
  }

  //adding a card
  oncardname(i) {
    console.log('card name', this.CardName.nativeElement.value,i);
    for (let index = 0; index < this.listoftasks.length; index++) {
      if (index==i) {
       this.listoftasks[i].Task.push({By: 'wisest lore', task: this.CardName.nativeElement.value} );
       this.hooks2[i]=false;
      }

    }
    // this.listoftasks.push(this.CardName.nativeElement.value);
    // this.Cardvisible = !this.Cardvisible;
  }


  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // console.log(this.todo);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // console.log(this.done);
    }
  }
}
