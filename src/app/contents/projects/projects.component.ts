import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { LoaderService } from 'src/interceptors/loader.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  toggle= false;
  allprojects=[];
  constructor(private projectservice: ProjectService, private router:Router,private loaderService: LoaderService,
    ) { }

  ngOnInit(): void {

    //getting user projects
    this.userprojects();



  }

  onCreateProject(){
    this.toggle=!this.toggle;
  }

  userprojects(){

    this.loaderService.setHttpProgressStatus(true);
    this.projectservice.getUserproject().subscribe(res=>{
      console.log("users projects", res);
     this.allprojects=res;
    });
    this.loaderService.setHttpProgressStatus(false);

  }

  onModalResult(result: boolean){
    console.log(result);
    this.toggle=result;

  }

  //clicked project
    onprojectclicked(projectitem){
      this.router.navigate(['/dashboard/content/projectboard/', projectitem.projectId]);
      //loading the project
      this.projectservice.oneproject(projectitem);
      console.log("clicked project",projectitem)
    }

}
