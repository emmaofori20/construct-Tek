import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  toggle= false;
  allprojects=[];
  constructor(private projectservice: ProjectService) { }

  ngOnInit(): void {

    this.projectservice.getUserproject().subscribe(res=>{
      console.log("users projects", res);

     this.allprojects=res;
    });



  }

  onCreateProject(){
    this.toggle=!this.toggle;
  }

  onModalResult(result: boolean){
    console.log(result);
    this.toggle=result;

  }

  //clicked project
    onprojectclicked(project){
      console.log("clicked project",project)
    }

}
