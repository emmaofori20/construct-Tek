import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '../services/woker.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  workerdetails;

  constructor(private activatedroute:ActivatedRoute, private workerservice:WorkerService) {
    this.workerservice.workerDetails.subscribe(results=>{
      this.workerdetails=results;
      console.log("project",results)
    });
   }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params)=>{
      console.log("these are the activated route",params.id);
      let _workerid= params.id;
      console.log("workerid", _workerid);
      this.workerservice._detailsWorker(_workerid).subscribe((results)=>{
        console.log("these are the results", results.data())
        this.workerdetails=results.data();
      })
    })
  }
  }


