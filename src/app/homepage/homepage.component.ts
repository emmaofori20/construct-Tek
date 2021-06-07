import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/interceptors/loader.service';
import { WorkerService } from '../services/woker.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  allWokers:any=[]

  constructor(private worker: WorkerService,private loaderService:LoaderService,) {


    //all the workers
   this.getallwokers()


  }

  ngOnInit(): void {
  }

  getallwokers(){
    try {
      this.loaderService.setHttpProgressStatus(true);
      this.worker.getallwokers().subscribe(res=>{
        this.allWokers=res;
        console.log("all the workers", this.allWokers);
        this.loaderService.setHttpProgressStatus(false);
    })
    } catch (error) {
      this.loaderService.setHttpProgressStatus(false);
      console.log(error.message);
    }

  }
  updateSearch($event){

  }




}
