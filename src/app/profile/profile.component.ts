import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ProjectService } from '../services/project.service';
import { WorkerService } from '../services/woker.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  workerdetails: any;
  projects;
  _workerid;

  constructor(
    private activatedroute: ActivatedRoute,
    private workerservice: WorkerService,
    private dataservice: DataService,
    private projectservice: ProjectService
  ) {
    this.workerservice.workerDetails.subscribe((results: any) => {
      this.workerdetails = results;
      console.log('project', results);
    });

    // requesting a worker to join your project
    this.projectservice.getUserproject().subscribe((res: any) => {
      this.projects = res;
      console.log('the projects of the user', res);
    });
  }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) => {
      console.log('these are the activated route', params.id);
      this._workerid = params.id;
      console.log('workerid', this._workerid);
      this.workerservice
        ._detailsWorker(this._workerid)
        .subscribe((results: any) => {
          console.log('these are the results', results.data());
          this.workerdetails = results.data();
        });
    });
  }

  chatworker() {
    console.log(document.getElementById('chat'));
    this.dataservice.set_Chatbox_to_open();
    this.openchat(true);
  }

  openchat(e) {
    console.log(e);
  }
  // sending a request to add a woker to your project
  onRequest(project) {
    console.log(
      'request',
      'the project id',
      project.projectId,
      'worker id',
      this._workerid
    );
    this.projectservice.addworker(project.projectId, this._workerid);
    //assign the project to the worker
    this.projectservice.assignproject(this._workerid, project.projectId);

    confirm(
      this.workerdetails.user.skill?.name +
        ' has been added to your project ' +
        " ' " +
        project.project.name +
        " ' "
    );
  }

  //toggling the timeline
  ontimeline() {
    document.getElementById('timeline').style.display = 'block';
    document.getElementById('timefont').style.color = 'blue';
    document.getElementById('aboutfont').style.color = 'black';
    document.getElementById('reviewfont').style.color = 'black';
    document.getElementById('about').style.display = 'none';
    document.getElementById('review').style.display = 'none';
  }
  //on about
  onAbout() {
    document.getElementById('about').style.display = 'block';
    document.getElementById('aboutfont').style.color = 'blue';
    document.getElementById('timefont').style.color = 'black';
    document.getElementById('reviewfont').style.color = 'black';
    document.getElementById('timeline').style.display = 'none';
    document.getElementById('review').style.display = 'none';
  }
  //on Review
  onReview() {
    document.getElementById('review').style.display = 'block';
    document.getElementById('reviewfont').style.color = 'blue';
    document.getElementById('timefont').style.color = 'black';
    document.getElementById('aboutfont').style.display = 'black';
    document.getElementById('timeline').style.display = 'none';
    document.getElementById('about').style.display="none";
  }
}
