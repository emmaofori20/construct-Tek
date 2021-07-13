import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  editProjectForm: FormGroup;

  constructor(private projectservice:ProjectService) {

   }

  ngOnInit(): void {

    this.editProjectForm= new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null)
    })
  }

  onBack(value:boolean){
    this.onResult.emit(value);
    console.log('onBack',value);
    }

    onSubmit(){

    }
}
