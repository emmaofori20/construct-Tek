import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/interceptors/loader.service';
import { DataService } from '../services/data.service';
import { WorkerService } from '../services/woker.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  allProfessionCategory: { name: any; value: any; }[];

  constructor(private worker: WorkerService,private loaderService:LoaderService, private data: DataService, private router:Router) { }

  ngOnInit(): void {
    this.getallwokers();
  }

  getallwokers(){
    try {
      this.loaderService.setHttpProgressStatus(true);
      this.worker.getallwokers().subscribe((res:any)=>{
        console.log('all the workers response',res)
       let _professionCategory= this.groupBy(res, user => user.user.skill.profession);
       console.log('final',_professionCategory)
       const arr = [..._professionCategory].map(([name, value]) => ({ name, value }));
       this.allProfessionCategory = Array.from(_professionCategory, ([name, value]) => ({ name, value }));

      //  console.log('teh data',this.allProfessionCategory)

        this.loaderService.setHttpProgressStatus(false);
    })
    } catch (error) {
      this.loaderService.setHttpProgressStatus(false);
      console.log(error.message);
    }

  }

//for grouping all the workers
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

//opening a categorty

opencategory(nameofcategory){
  this.worker.getcategoryworkers(nameofcategory)
  console.log('data 2', nameofcategory)
  this.router.navigate(['homepage', nameofcategory]);

}
//for search
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
