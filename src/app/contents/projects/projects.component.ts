import { Component, OnInit, Output } from '@angular/core';
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
  modalState: boolean;
  deletedproject:any;
  isEdit:boolean;
  @Output() message: string;

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
      // this.projectservice.oneproject(projectitem);
      console.log("clicked project",projectitem)
    }

  //actions carried on a modal;
    onModalResultdelete(results){
      if(results){
        console.log('the project', this.deletedproject.projectId);
      this.projectservice.deleteproject(this.deletedproject.projectId);
      this.modalState=false;
      }else{
        this.modalState=false;
      }
    }

    //function to open modal
    deleteproject(event,item){
      event.stopPropagation();
      this.modalState=true;
      this.message="Are you sure you want to delete this project?";
      this.deletedproject=item;

    }

  //edit project
  oneditproject(item, event){
    event.stopPropagation();
    console.log('item to be edited', item.projectId);
    this.projectservice.oneproject(item);
    this.isEdit=true;
  }

  onModalResultEdit(results){
    console.log(results);
    this.isEdit=results;
  }
}
