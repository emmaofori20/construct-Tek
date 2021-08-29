import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  editProjectForm: FormGroup;
  nameofproject;
  descriptionofproject;
  projectid;

  constructor(private projectservice:ProjectService, private afs: AngularFirestore,private data: DataService,) {

    this.projectservice.project.subscribe((res:any)=>{
      // console.log("the project to be edited", res)
      this.nameofproject= res.project.name;
      this.descriptionofproject =res.project.description;
      this.projectid=res.projectId
    })
   }

  ngOnInit(): void {

    this.editProjectForm= new FormGroup({
      name: new FormControl(this.nameofproject),
      description: new FormControl(this.descriptionofproject)
    })
  }

  onBack(value:boolean){
    this.onResult.emit(value);
    console.log('onBack',value);
    }

    onSubmit(){
      this.editProjectForm.value.name;
      this.projectservice.editproject(this.projectid,this.editProjectForm.value.name , this.editProjectForm.value.description);
      this.onBack(false)
    }
}
