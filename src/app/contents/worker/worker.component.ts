import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WorkerService } from 'src/app/services/woker.service';
import { LoaderService } from 'src/interceptors/loader.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
})
export class WorkerComponent implements OnInit {
  workerDetails: any;
  worker = false;
  asignedprojects:any=[];
  _userId: any;
  Editworker = false;
  imagesupload=[];
  @Output() message: string;
  modalState: boolean;
  modalState2:boolean;
  itemproject:any;
  AssignedModal=false;

  constructor(
    private dataservice: DataService,
    private workerservice: WorkerService,
    private afs: AngularFirestore,
    private router:Router,
    private loaderService: LoaderService,

  ) {
    this._userId = this.dataservice.getuserid();
    //getting the workerDetails
    this.workerDetails = this.dataservice
      .workerDetails(this.dataservice.getuserid())
      .subscribe((res: any) => {
        this.workerDetails = res;
        // console.log("worker details", res.user.skill)
        //  this.workerDetails.user.skill
      });
  }

  private idofuser;
  ngOnInit(): void {
    //getting all the assigned projects of a worker
    this.loaderService.setHttpProgressStatus(true);

   this.workerservice.assignedprojects().subscribe((results: any) => {
    // console.log("res", results.docs[1].data())
    for (let index = 0; index < results.docs.length; index++) {

        this.afs
        .collection('Users')
        .doc(results.docs[index].data().userid)
        .collection('Projects')
        .doc(results.docs[index].data().userprojectid)
        .get().subscribe((doc)=>{
          //  documentproject.push(doc);
          this.asignedprojects.push(doc.data());
          console.log('tkhe assigned project',this.asignedprojects)
        });


      }
      this.loaderService.setHttpProgressStatus(false);

    })


  }

  onWorker() {
    this.worker = true;
  }

  onModalResult(e) {
    console.log(e);
    this.worker = false;
    this.Editworker = false;
  }

  //Edit a worker details
  onEdit() {
    this.Editworker = true;
  }

  //join the project
  joinproject(item,index){
    this.workerservice.assignedprojects().subscribe((data:any)=>{
      // console.log("userid of index",data.docs[index].data().userid);
      console.log("project", item);
      this.workerservice.viewinguseridproject(data.docs[index].data().userid)
      this.router.navigate(['/dashboard/content/viewboard/', item.projectId,data.docs[index].data().userid ]);
    })

  }

  //deleting image
  imagedelete(image){
    console.log("image url", image);
    this.workerservice.onImagedelete(image)
  }

  //setting image feature
  setfeaturedimage(image){
    console.log('the image link', image)
  }

  //uploadingimage for the workers profile
  Uploadimage(){
    document.getElementById("file-upload3").click();
  }
  onChange(event1){

    if (event1.target.files && event1.target.files[0]) {
      var filesAmount = event1.target.files.length;

      let file =(event1.target as HTMLInputElement).files[0]
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();

              reader.onload = (event:any) => {
                // this.workerimages.push((event1.target as HTMLInputElement).files[i]);
                //  this.imagesupload.push((event1.target as HTMLInputElement).files[i]);
                 console.log("the uploaded images", this.imagesupload);

                 let Userid = localStorage.getItem('user');
                 this.workerservice.uploadFile2((event1.target as HTMLInputElement).files[i],Userid);
              }

              reader.readAsDataURL(event1.target.files[i]);
      }


  }


  }

  //for calling teh modal with the assigned model

  assignedmodalbutton(){
    this.AssignedModal=true;
  }

  //deleteing profession details
  onDelete(){
    this.modalState=true;
    this.message="Are you sure you want to delete your profile?";
  }

  onModalResultdelete(results){
    if(results){
        console.log("the results is true", results);
        let userid = localStorage.getItem("user");
        this.workerservice.deleteprofile(userid);
        this.workerDetails = this.dataservice
      .workerDetails(userid)
      .subscribe((res: any) => {
        this.workerDetails = res;
        // console.log("worker details", res.user.skill)
        //  this.workerDetails.user.skill
      });
        this.modalState=false
    }else{
      this.modalState=results;
    }
  }

  //leaving a project
  leaveproject(item,i){
    this.modalState2=true;
    console.log('the project leeave',item,i);
    this.message="Are you sure you want to leave this project?";
    this.itemproject=item;
  }

  //modal perfoming leave a project
  onModalprojectdelete(results){
    if(results){
      this.workerservice.getdetailsofleaveproject(this.itemproject);
      this.modalState2=false;
    }
    else{
      this.modalState2=results;
    }
  }


  onBack(f){
    this.AssignedModal=f;

  }
}
