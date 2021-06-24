import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/interceptors/loader.service';
import { DataService } from '../services/data.service';
import { WorkerService } from '../services/woker.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  allWokers:any=[]

  constructor(private worker: WorkerService,private loaderService:LoaderService, private data: DataService, private router:Router) {


    //all the workers
   this.getallwokers()


  }

  ngOnInit(): void {
  }
  //open worker
  openWorker(worker){
    console.log("worker", worker);
    this.router.navigate(['worker', worker.id])
  }

  getallwokers(){
    try {
      this.loaderService.setHttpProgressStatus(true);
      this.worker.getallwokers().subscribe((res:any)=>{
        this.allWokers=res;
        console.log("all the workers", this.allWokers);
        this.loaderService.setHttpProgressStatus(false);
    })
    } catch (error) {
      this.loaderService.setHttpProgressStatus(false);
      console.log(error.message);
    }

  }
  updateSearch(searchTextValue: string){
    if(searchTextValue){
      document.getElementById('workers').style.display='none';
      document.getElementById('searchResults').style.display="flex";
    this.data.search(searchTextValue);
    console.log(searchTextValue);
  }else{
    document.getElementById('workers').style.display='flex';
    document.getElementById('searchResults').style.display="none";
  }
  }




}
