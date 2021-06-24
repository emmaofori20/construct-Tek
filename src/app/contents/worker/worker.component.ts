import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WorkerService } from 'src/app/services/woker.service';

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
  constructor(
    private dataservice: DataService,
    private workerservice: WorkerService,
    private afs: AngularFirestore,
    private router:Router
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
   this.workerservice.assignedprojects().subscribe((results: any) => {
    console.log("res", results.docs[1].data())
    for (let index = 0; index < results.docs.length; index++) {

        this.afs
        .collection('Users')
        .doc(results.docs[index].data().userid)
        .collection('Projects')
        .doc(results.docs[index].data().userprojectid)
        .get().subscribe((doc)=>{
          //  documentproject.push(doc);
          this.asignedprojects.push(doc.data())
        });


      }

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
    debugger;
    this.workerservice.assignedprojects().subscribe((data:any)=>{
      console.log("userid of index",data.docs[index].data().userid);
      console.log("project", item);
      this.workerservice.viewinguseridproject(data.docs[index].data().userid)
      this.router.navigate(['/dashboard/content/viewboard/', item.projectId]);
    })

  }
}
