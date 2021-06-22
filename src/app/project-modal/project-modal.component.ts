import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/interceptors/loader.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {

  ProjectForm: FormGroup;
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();

  constructor(private project: ProjectService,
    private loaderService: LoaderService
    ) { }

  ngOnInit(): void {
    this.ProjectForm= new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null)
    })
  }

  //creating a project
  async  onSubmit(){
    this.loaderService.setHttpProgressStatus(true);
    console.log("Project form",this.ProjectForm.value);
    await this.project.newproject(this.ProjectForm.value.name,this.ProjectForm.value.description);
    //reset the form
    this.ProjectForm.reset();
    this.onResult.emit(false)
    this.loaderService.setHttpProgressStatus(false);


  }

  onBack(value:boolean){
    this.onResult.emit(value);
    console.log('onBack',value);
    }
}
