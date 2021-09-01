import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WorkerService } from 'src/app/services/woker.service';
import { LoaderService } from 'src/interceptors/loader.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  private _projectid: any;
  Team: any[]=[{}];
  hooks;
  hooks2;
  // @ViewChild('changeListname') changeListname: ElementRef;
  _userId: string;
  user: any;
  ReviewForm: FormGroup;
  reviewname: any;
  reviewimage: any;
  @Output('onResult') onResult:EventEmitter<boolean>=new EventEmitter();
  Userid: string;
  worker:any
  reviewed=false;
  rated=false;
  constructor(    private activatedroute: ActivatedRoute,
    private projectservice: ProjectService,
    private afs:AngularFirestore,
    private userservice: UserServiceService,
    private dataservice:DataService,
    private workerservice: WorkerService,
    private loaderService: LoaderService,


    ) {

    this._userId= this.dataservice.getuserid();
    //getting the current user id
    this.user=this.userservice.getActiveUser(this.dataservice.getuserid()).subscribe((res:any)=>{
      this.user=res;
      console.log("user", this.user)
      this.reviewname= res.user.firstName;
      this.reviewimage= this.user.user.photo;
      console.log('the user'  , this.reviewname)
      console.log('the user222'  , this.reviewimage)

      this.ReviewForm=new FormGroup({
        comment: new FormControl(),
        name: new FormControl(this.reviewname),
        image: new FormControl(this.reviewimage),
      });
    });

    this.projectservice.Rateworker.subscribe((res:any)=>{
      console.log('please rate mewwwwwwwwwwwwwwwwwwwwwww',res);
      this.Team.push(res)
      this.worker=res;
    })

     }

  ngOnInit(): void {
    this.loaderService.setHttpProgressStatus(true);
    this.Userid = localStorage.getItem('user');


    // this.activatedroute.params.subscribe((params)=>{
    //   console.log('the activated route',params);
    //   this._projectid = params['projectId'];
    //   this.projectservice.userproject(this._projectid,this.Userid).subscribe((results:any) => {
    //     console.log('these are rating results', results);
    //     this.loaderService.setHttpProgressStatus(false);

    //     if(results.Teams!=null){
    //       this.loadTeamMembers(results.Teams);
    //      }else{

    //      }
    //   })
    // })



  }


    //loading the team
// loadTeamMembers(TeamMembers:any){
//   let members=[];
//   this.Team=[]

//   for (let i = 0; i < TeamMembers.length; i++) {
//    this.afs.collection('Users').doc(TeamMembers[i]).get().subscribe((results)=>{
//      members.push(results.data())
//      this.Team.push(results.data())
//      console.log("members of the team", members)
//      console.log("membersssssss of the team", this.Team)

//    });
//   };
// setTimeout(()=>{
//   this.hooks= this.Team.map(i=>true);
//   this.hooks2=this.Team.map(i=>true)
//   console.log('the all hooks',this.hooks)
// },1000)



// }

onBack(boolean){
    this.onResult.emit(boolean);
    console.log('onBack',boolean);

    // this.afs.collection("Users").doc(this.Userid).collection('Projects').doc(this._projectid).update({
    //   'isProjectComplete': false,
    //   // 'OnSetmeasure': false
    // })
  }


  Addrating(value,item, prating){

    let rvalue = (prating+value)/2
    console.log('the value', value, 'the item is',item, prating);
    console.log('the rated value is', rvalue);
    let roudedvalue = Math.round(rvalue * 10) / 10;
    console.log('the rated value is', roudedvalue);
    // this.hooks[index] = false;
    this.rated=!this.rated

    this.afs.collection('Users').doc(item.id).update({
      'user.skill.ratings': roudedvalue
    })
  }


  //adding comment
  onAddreview(workerid){

       console.log('form details',this.ReviewForm.value.comment);
       this.reviewed=!this.reviewed;
      // this.workerservice.addreview(workerid, this.ReviewForm.value);
      // this.ReviewForm.reset();
      // // this.hooks2[index] = false;
      //this.onBack(false)




  }


}
