import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user:any;
  _userId;

  constructor(private auth:AuthService, private router: Router, private userservice: UserServiceService, private dataservice:DataService) { }

  ngOnInit(): void {

    this._userId= this.dataservice.getuserid();
    //getting the current user id
    this.user=this.userservice.getActiveUser(this.dataservice.getuserid()).subscribe(res=>{
      this.user=res;
      console.log("user", this.user.user.firstName)
    });
  }


  onOpensidebar(){
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebar.classList.toggle("active");
    if(sidebar.classList.contains("active")){
    sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
  }else
    sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");

  }

  //logout of the app
  onLogOut(){
    this.auth.SignOut().then(()=>{
      localStorage.clear();
      this.router.navigate(["login"]);}
    );

  }


    //for search
    updateSearch(searchTextValue: string){
      if(searchTextValue){
        // document.getElementById('workers').style.display='none';
        // document.getElementById('searchResults').style.display="flex";
      this.dataservice.search(searchTextValue);
      console.log(searchTextValue);
      this.router.navigate(['dashboard/content/search']);
    }else{
      // document.getElementById('workers').style.display='flex';
      // document.getElementById('searchResults').style.display="none";
      this.router.navigate(['dashboard/content/home-page']);

    }
    }

}



