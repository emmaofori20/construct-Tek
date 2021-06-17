import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-workboard',
  templateUrl: './workboard.component.html',
  styleUrls: ['./workboard.component.scss']
})
export class WorkboardComponent implements OnInit {

  _projects:any;
  backgrounimage;
  constructor(private projectservice:ProjectService, private activatedroute:ActivatedRoute) {

    this.projectservice.project.subscribe(results=>{
      this._projects=results;
      this.backgrounimage= results.backgroundImage
      console.log("project",results)
    });
   }

  ngOnInit(): void {

    //getting a project data after reloading
    this.activatedroute.params.subscribe((params)=>{
      console.log("these are the activated route",params);
      let _projectid= params["projectId"];
      console.log("projectId", _projectid);
      this.projectservice.userproject(_projectid).subscribe((results)=>{
        console.log("these are the results", results.data())
        this._projects=results.data();
      })
    })
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(this.todo)
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                      console.log(this.done)
    }
  }


}
