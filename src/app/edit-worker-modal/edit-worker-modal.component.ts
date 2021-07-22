import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from 'src/interceptors/loader.service';
import { DataService } from '../services/data.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-edit-worker-modal',
  templateUrl: './edit-worker-modal.component.html',
  styleUrls: ['./edit-worker-modal.component.scss']
})
export class EditWorkerModalComponent implements OnInit {

  profession=['Acoustics consultant','Architect','Architectural technician','Architectural technologist','Bricklayer','Builders merchant','Building control officer','Building services engineer','Building site inspector','Building surveyor', 'Building technician', 'Carpenter', 'Carpet fitter and floor layer', 'Cavity insulation installer' ,'Ceiling fixer', 'Construction contracts manager','Construction labourer','Construction manager','Construction site supervisor','Dry liner','Electrician', 'Facilities manager','Fence installer','Gas service technician','Gas mains layer','General practice surveyor','Glazier','Kitchen and bathroom fitter','Landscaper','Paint sprayer','Painter and decorator','Plasterer','Plumber','Quantity surveyor','Refrigeration and air-conditioning installer','Roofer','Scaffolder','Steel erector','Stonemason','Tiler','Welder','Water network operative','Window fitter','Wood machinist'];

  @Output('onResultWorker') onResultWorker:EventEmitter<boolean>=new EventEmitter();

  images=[];
  workerimages=[];

  name:string;
  profression:string;
  location:string;
  phoneNumber: number;
  email:string;
  gender:string;
  Wokerimages;
  ratings;


  EditWorkerForm: FormGroup;
  constructor(private userservice: UserServiceService, private dataservice: DataService, private loaderService: LoaderService,
    ) {

     }

  ngOnInit(): void {


    this.dataservice.workerDetails(this.dataservice.getuserid()).subscribe((res:any)=>{
      console.log("worker details", res.user.skill);
      this.name=res.user.skill.name;
      this.profession=res.user.skill.profession;
      this.location=res.user.skill.location;
      this.phoneNumber=res.user.skill.phoneNumber;
      this.email=res.user.skill.email;
      this.gender=res.user.skill.gender;
      this.Wokerimages=res.user.skill.Wokerimages;


      this.EditWorkerForm= new FormGroup({
        name : new FormControl(this.name),
        profession : new FormControl(this.profession),
        location: new FormControl(this.location),
        phoneNumber: new FormControl(this.phoneNumber),
        email: new FormControl(this.email),
        gender: new FormControl(this.gender),
        Wokerimages: new FormControl(this.Wokerimages),
      })
    });



  }


  onBack(value:boolean){
    this.onResultWorker.emit(value);
    console.log('onBack',value);
    }

    async onUpdate(){
      console.log('this is the workers details',this.EditWorkerForm.value);

      try {
        this.loaderService.setHttpProgressStatus(true);
       let res= this.dataservice.updateworkerdetails(this.EditWorkerForm.value);
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
