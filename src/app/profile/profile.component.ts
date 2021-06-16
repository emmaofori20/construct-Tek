import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { WorkerService } from '../services/woker.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  workerdetails:any;

  constructor(private activatedroute:ActivatedRoute, private workerservice:WorkerService, private dataservice:DataService) {
    this.workerservice.workerDetails.subscribe((results:any)=>{
      this.workerdetails=results;
      console.log("project",results)
    });
   }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params)=>{
      console.log("these are the activated route",params.id);
      let _workerid= params.id;
      console.log("workerid", _workerid);
      this.workerservice._detailsWorker(_workerid).subscribe((results:any)=>{
        console.log("these are the results", results.data())
        this.workerdetails=results.data();
      })
    })
  }


  chatworker(){
    console.log(document.getElementById('chat'));
    this.dataservice.set_Chatbox_to_open();
    this.openchat(true);
  }

  openchat(e){
    console.log(e)
  }
  }


