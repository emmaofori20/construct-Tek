import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {

  ProjectForm: FormGroup;
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.ProjectForm= new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null)
    })
  }

  onSubmit(){
    console.log("Project form",this.ProjectForm.value)
  }

  onBack(value:boolean){
    this.onResult.emit(value);
    console.log('onBack',value);
    }
}
