import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ProjectService } from '../services/project.service';
import { WorkerService } from '../services/woker.service';
import '../../assets/smtp.js'; // file path
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { LoaderService } from 'src/interceptors/loader.service';
import { SnotifyService } from 'ng-snotify';

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

  CurrentUser;

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
      this.CurrentUser=response;
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
    // this.projectservice.addworker(project.projectId, this._workerid);
    // //assign the project to the worker
    // this.projectservice.assignproject(this._workerid, project.projectId);

    //sending the mail to a worker
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'constructtek1@gmail.com',
      Password: 'E56B99B1B6B725ACD1D440C3DF367D21BE0F',
      To: `${this.workerdetails.user.skill.email}`,
      From: 'constructtek1@gmail.com',
      Subject: 'Construct-tek',
      Body: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="EN">
  <head>
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          src: local("Lato Regular"), local("Lato-Regular"), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff");
        }
        body, html {
          margin: 0px;
          padding: 0px;
          -webkit-font-smoothing: antialiased;
          text-size-adjust: none;
          width: 100% !important;
          background: #F9F9FF;
          font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif;
          word-break: break-word;
        }
        .contentMainTable {
          background: #FFFFFF;
          border: 1px solid #EEEEFF;
          margin-top: 98px;
          margin-bottom: 69px;
          margin-left: auto;
          margin-right: auto;
          width: 600px;
          height: 1003px;
        }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
          line-height: 100%;
        }
        .ExternalClass {
          width: 100%;
        }
        .logoImage {
          margin-top: -50px;
          padding-bottom: 7px;
        }
        h1 {
          font-weight: bold;
          font-size: 30px;
          font-family: "Lato";
          letter-spacing: 0px;
          color: #25254E;
        }
        p {
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 0px;
          color: #4D4D80;
        }
        .greyLine {
          border: 1px solid #CED7F7;
          width: 100%;
          margin-top: 32px
        }
        h2 {
          font-weight: bold;
          font-size: 15px;
          letter-spacing: 0px;
          color: #25254E;
        }
        h3 {
          font-weight: 300;
          font-size: 15px;
          letter-spacing: 0px;
          color: #4D4D80;
        }
        .footer {
          margin-top: 32px;
          margin-bottom: 20px;
          font-size: 11px;
          font-weight: 300px;
          color: #4D4D80;
        }
        .footerIcons img {
          margin-left: 11px;
          margin-right: 11px;
        }
        .blueButton {
          background: #8AA1EB;
          border-radius: 10px;
          padding: 17px 35px;
          border: none;
          color: #FFFFFF;
          font-size: 15px;
          margin-bottom: 32px;
          cursor: pointer;
        }
        .blueButton:focus {
          outline: none;
          border: 2px solid #5457FF;
          padding: 15px 33px;
        }
        @media only screen and (max-width: 480px) {
          table, table tr td, table td {
            width: 100%;
          }
          .contentMainTable {
            width: 100%;
            border: none;
          }
          body, html {
            background: #FFFFFF;
          }
          h1 {
            font-size: 24px;
          }
        }
      }
    </style>
    <title>
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="padding:0; margin: 0;">
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="body_table">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table border="0" cellpadding="20" cellspacing="0" width="100%" class="contentMainTable">
              <tbody>
                <tr>
                  <td align="center" valign="top">
                    <img class="logoImage" src="https://api.elasticemail.com/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/logodefaulttemplate.png" alt="#">
                    <table border="0" cellpadding="20" cellspacing="0" width="100%" id="content">
                      <tbody>
                        <tr>
                          <td align="center" valign="top">
                            <span class="isDesktop">
                              <h1 style="margin-bottom: 32px">
                                Welcome to Construct-tek!
                              </h1>
                              <p style="margin-top:0px"> ${this.CurrentUser.user.firstName} has invited to join a project. Kindly log in and  visit your dashboard...
                              </p></span>
                            <div class="greyLine">
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" valign="top">
                            <img src="https://api.elasticemail.com/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/security_illu.png" alt="#">
                            <h2>Security
                            </h2>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" valign="top">
                            <img src="https://api.elasticemail.com/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/Mask_Group_2.png" alt="#">
                            <h2>Settings
                            </h2>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" valign="top">
                            <a target="_blank"><button class="blueButton">See more</button></a> <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
                            </p>
                            <div class="greyLine">
                            </div>
                            <div class="footer">
                              If you no longer wish to receive mail from us, you can
                              <a href="{unsubscribe}" target="_blank">Unsubscribe</a>
                              <br>
                              {accountaddress}
                            </div>
                            <div class="footerIcons">
                              <a href="http://facebook.com" target="_blank"><img src="https://api.elasticemail.com/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/facebook.png" alt="#"></a> <a href="http://twitter.com" target="_blank"><img src="https://api.elasticemail.com/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/twitter.png" alt="#"></a> <a href="http://youtube.com" target="_blank"><img src="https://api.elasticemail.com/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/youtube.png" alt="#"></a> <a href="http://linkedin.com" target="_blank"><img src="https://api.elasticemail.com/userfile/a18de9fc-4724-42f2-b203-4992ceddc1de/linkedin.png" alt="#"></a></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
    }).then((message) => {
      console.log('message is sent')
      alert(message);
    });

    // confirm(
    //   this.workerdetails.user.skill?.name +
    //     ' has been added to your project ' +
    //     " ' " +
    //     project.project.name +
    //     " ' "
    // );
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
