import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { WorkerService } from '../services/woker.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  listwokers=[];

  constructor(private data:DataService, private worker:WorkerService,private router:Router) { }

  ngOnInit(): void {

    //get search item
    this.data.searchItem.subscribe(searchparam=>{
      console.log("the search param", searchparam);
      if(searchparam){
        this.worker.getallwokers().subscribe(results=>{
          this.listwokers=[];
          console.log(results," THIS IS THE ACCESS LIST");
          results.forEach((doc:any)=>{
            if (doc.user.skill.name.toLowerCase().includes(searchparam.toLowerCase())){
              this.listwokers.push(doc);

            }
            console.log("the lsit of woker", this.listwokers);
          })
        })
      }else{
        this.listwokers=[];
      }
    })


  }


  openWorker(worker) {
    console.log('worker', worker);
    this.router.navigate(['dashboard/content/worker', worker.id]);
  }

}
