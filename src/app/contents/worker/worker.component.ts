import { Component,  OnInit, } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  workerDetails:any;
  worker=false;
  _userId: any;
  Editworker=false;
  constructor(private dataservice: DataService) {

    this._userId= this.dataservice.getuserid();
    //getting the workerDetails
    this.workerDetails=this.dataservice.workerDetails(this.dataservice.getuserid()).subscribe(res=>{
      this.workerDetails=res;
      console.log("worker details", res)
      console.log("response", this.workerDetails.photo)
    });
   }

  ngOnInit(): void {

  }

  onWorker(){
    this.worker=true;
  }

  onModalResult(e){
    console.log(e);
    this.worker=false;
    this.Editworker=false
  }

  //Edit a worker details
  onEdit(){
    this.Editworker=true;
  }

}
