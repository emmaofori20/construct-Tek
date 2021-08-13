import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ProjectService } from '../services/project.service';
import { WorkerService } from '../services/woker.service';
import '../../assets/smtp.js'; // file path
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { LoaderService } from 'src/interceptors/loader.service';
declare let Email: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  workerdetails: any;
  projects;
  _workerid;
  ReviewForm: FormGroup;

  reviewname;
  reviewimage;

  constructor(
    private loaderService: LoaderService,
    private userservice: UserServiceService,
    private activatedroute: ActivatedRoute,
    private workerservice: WorkerService,
    private dataservice: DataService,
    private projectservice: ProjectService
  ) {
    // requesting a worker to join your project
    this.projectservice.getUserproject().subscribe((res: any) => {
      this.projects = res;
      console.log('the projects of the user', res);
    });
  }

  ngOnInit(): void {
    this.loaderService.setHttpProgressStatus(true);

    this.activatedroute.params.subscribe((params) => {
      console.log('these are the activated route', params.id);
      this._workerid = params.id;
      console.log('workerid', this._workerid);
      this.workerservice
        ._detailsWorker(this._workerid)
        .subscribe((results: any) => {
          console.log('these are the results', results);
          this.workerdetails = results;
          this.loaderService.setHttpProgressStatus(false);
        });
    });

    //user details
    let _userid = localStorage.getItem('user');
    this.userservice.getActiveUser(_userid).subscribe((response: any) => {
      console.log('the users details', response.user.firstName);
      this.reviewname = response.user.firstName;
      this.reviewimage = response.user.photo;
      console.log('the users details', response.user.firstName);

      this.ReviewForm = new FormGroup({
        comment: new FormControl(),
        name: new FormControl(this.reviewname),
        image: new FormControl(this.reviewimage),
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

    //sending the mail to a worker
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'constructtek1@gmail.com',
      Password: '9DE6B96C1B7D4D099B6CE591631527AF745A',
      To: 'emmanuelofori2638@gmail.com',
      From: 'constructtek1@gmail.com',
      Subject: 'worm',
      Body: `
      <i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b>${project.projectId} <br /> <b>Email: </b>${project.projectId}<br /> <b>Subject: </b>${project.projectId}<br /> <b>Message:</b> <br /> ${project.projectId} <br><br> <b>~End of Message.~</b> `,
    }).then((message) => {
      alert(message);
    });

    confirm(
      this.workerdetails.user.skill?.name +
        ' has been added to your project ' +
        " ' " +
        project.project.name +
        " ' "
    );
  }
  //sending comments
  onsend() {
    // console.log('the comment to be sent', this.ReviewForm.value);
    this.workerservice.addreview(this._workerid, this.ReviewForm.value);
    this.ReviewForm.reset();
  }

  //toggling the timeline
  ontimeline() {
    document.getElementById('timeline').style.display = 'block';
    document.getElementById('timefont').style.color = 'blue';
    document.getElementById('aboutfont').style.color = 'black';
    document.getElementById('about').style.display = 'none';
    document.getElementById('review').style.display = 'none';
  }

  //on about
  onAbout() {
    document.getElementById('about').style.display = 'block';
    document.getElementById('timefont').style.color = 'black';
    document.getElementById('aboutfont').style.color = 'blue';
    document.getElementById('timeline').style.display = 'none';
    document.getElementById('review').style.display = 'none';
  }

  onReviews() {
    document.getElementById('review').style.display = 'block';
    document.getElementById('reviewfont').style.color = 'blue';
    document.getElementById('aboutfont').style.color = 'black';
    document.getElementById('timefont').style.color = 'black';
    document.getElementById('timeline').style.display = 'none';
    document.getElementById('about').style.display = 'none';
  }
}
