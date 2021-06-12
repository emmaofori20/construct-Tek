import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-workboard',
  templateUrl: './workboard.component.html',
  styleUrls: ['./workboard.component.scss']
})
export class WorkboardComponent implements OnInit {

  _projects:any;
  backgrounimage;
  constructor(private projectservice:ProjectService) { }

  ngOnInit(): void {
    this.projectservice.project.subscribe(results=>{
      this._projects=results;
      this.backgrounimage= results.backgroundImage
      console.log("project",results)
    })
  }

}
