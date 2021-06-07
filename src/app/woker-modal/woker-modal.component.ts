import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/interceptors/loader.service';
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

  constructor(private userservice: UserServiceService, private data: DataService, private loaderService: LoaderService,
    ) { }

  ngOnInit(): void {
  }

  onBack(value:boolean){
    this.onResultWorker.emit(value);
    console.log('onBack',value);
    }

    async onsubmit(){
      console.log('this is the workers details',this.workerForm.value);

      try {
        this.loaderService.setHttpProgressStatus(true);
       let res= this.data.newWorker(this.workerForm.value, this.workerimages);
       this.onBack(false);
       console.log("response from woker ipload", res);

      } catch (error) {
        console.log("rerror from upload", error);
        this.loaderService.setHttpProgressStatus(false);
      }


    }

    onAddpic(){
      document.getElementById("image-upload").click();
    }

    onChange(event1){

      if (event1.target.files && event1.target.files[0]) {
        var filesAmount = event1.target.files.length;
        let file =(event1.target as HTMLInputElement).files[0]
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  this.workerimages.push((event1.target as HTMLInputElement).files[i]);
                   this.images.push(event.target.result);
                }

                reader.readAsDataURL(event1.target.files[i]);
        }

    }

    }
}
