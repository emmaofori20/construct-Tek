import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-woker-modal',
  templateUrl: './woker-modal.component.html',
  styleUrls: ['./woker-modal.component.scss']
})
export class WokerModalComponent implements OnInit {

  profession=['Acoustics consultant','Architect','Architectural technician','Architectural technologist','Bricklayer','Builders merchant','Building control officer','Building services engineer','Building site inspector','Building surveyor', 'Building technician', 'Carpenter', 'Carpet fitter and floor layer', 'Cavity insulation installer' ,'Ceiling fixer', 'Construction contracts manager','Construction labourer','Construction manager','Construction site supervisor','Dry liner','Electrician', 'Facilities manager','Fence installer','Gas service technician','Gas mains layer','General practice surveyor','Glazier','Kitchen and bathroom fitter','Landscaper','Paint sprayer','Painter and decorator','Plasterer','Plumber','Quantity surveyor','Refrigeration and air-conditioning installer','Roofer','Scaffolder','Steel erector','Stonemason','Tiler','Welder','Water network operative','Window fitter','Wood machinist'];

  @Output('onResultWorker') onResultWorker:EventEmitter<boolean>=new EventEmitter();

  images=[];
  workerimages=[]
  workerForm: FormGroup= new FormGroup({
    name : new FormControl('', [Validators.required, Validators.minLength(3)]),
    profession : new FormControl('', Validators.required),
    location: new FormControl('',  Validators.required),
    phoneNumber: new FormControl('',  Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required),
    Wokerimages: new FormControl(),
    ratings: new FormControl(0)
  })

  constructor(private userservice: UserServiceService, private data: DataService) { }

  ngOnInit(): void {
  }

  onBack(value:boolean){
    this.onResultWorker.emit(value);
    console.log('onBack',value);
    }

    async onsubmit(){
      console.log('this is the workers details',this.workerForm.value);

      this.data.newWorker(this.workerForm.value, this.workerimages);

    }

    onAddpic(){
      document.getElementById("image-upload").click();
    }

    onChange(event){

      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        let file =(event.target as HTMLInputElement).files[0]
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  this.workerimages.push(file);
                   this.images.push(event.target.result);

                  //  this.workerForm.patchValue({
                  //   Wokerimages: this.images
                  //  });
                }

                reader.readAsDataURL(event.target.files[i]);
        }

    }

    }
}
