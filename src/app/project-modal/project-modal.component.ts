import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
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
    private loaderService: LoaderService,
    private _service: NotificationsService,

    ) { }

  ngOnInit(): void {
    this.ProjectForm= new FormGroup({
      name: new FormControl(null,  [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      description: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
    })
  }

  //creating a project
  async onSubmit(){

    // if(this.ProjectForm.value.name===null){
    //   console.log('empty')
    // }

    // console.log('the erroe', this.ProjectForm.value)
    if (this.ProjectForm.value.name ===null ){
      console.log('it is empty');
      this._service.error('Error','Please add a name',{
        position:['bottom','right'],
        timeOut: 4000,
        animate: 'fade',
        showProgressBar:true
      })
     }else{
    this.loaderService.setHttpProgressStatus(true);
    console.log("Project form",this.ProjectForm.value);
    await this.project.newproject(this.ProjectForm.value.name,this.ProjectForm.value.description);
    //reset the form
    this.ProjectForm.reset();
    this.onResult.emit(false)
    this.loaderService.setHttpProgressStatus(false);
    }

  }

  onBack(value:boolean){
    this.onResult.emit(value);
    console.log('onBack',value);
    }
}
