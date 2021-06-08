import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  project= false;
  constructor() { }

  ngOnInit(): void {
  }

  onCreateProject(){
    this.project=!this.project;
  }

  onModalResult(result: boolean){
    console.log(result);
    this.project=result;
    // this.worker=false;
  }
}
