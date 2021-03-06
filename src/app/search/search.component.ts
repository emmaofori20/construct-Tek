import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { WorkerService } from '../services/woker.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  listwokers=[];

  constructor(private data:DataService, private worker:WorkerService) { }

  ngOnInit(): void {

    //get search item
    this.data.searchItem.subscribe(searchparam=>{
      console.log("the search param", searchparam);
      if(searchparam){
        this.worker.getallwokers().subscribe(results=>{
          this.listwokers=[];
          console.log(results," THIS IS THE ACCESS LIST");
          results.forEach((doc:any)=>{
            if (doc.skill.name.toLowerCase().includes(searchparam.toLowerCase())){
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

}
