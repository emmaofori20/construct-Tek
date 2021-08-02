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
  highlyratedworkers:any;

  public images = ['../../assets/slide1.jpg', '../../assets/image1.jpg', '../../assets/image2.jpg', '../../assets/image3.jpg'];
  // Some array of things.
  public employeedata = [];
  // Pagination parameters.
  p: Number = 1;
  c:Number=1
  count: Number = 5;

  //slideshow parameters
  title: string;
  description: string;
  role: Number;
  public selectedindex: number = 0;
  constructor(private worker: WorkerService,private loaderService:LoaderService, private data: DataService, private router:Router) { }

  ngOnInit(): void {
    this.getallwokers();
    this.Highglyratedworkers();
    this.showSlides();
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

  //Highly rated worker
  Highglyratedworkers(){
    this.worker.highratingworkers().subscribe((res:any)=>{
      console.log('hightly rated worlers',res);
      this.highlyratedworkers=res;
    })
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
  //open worker
  openWorker(worker) {
    console.log('worker', worker);
    this.router.navigate(['worker', worker.id]);
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

  selectImage(index: number) {
  console.log("Index: " + index);
  this.selectedindex = index;
  console.log("Selected Index: " + this.selectedindex);
}

showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    (<HTMLElement>slides[i]).style.display = "none";
  }
  this.selectedindex++;
  if (this.selectedindex > slides.length) { this.selectedindex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  (<HTMLElement>slides[this.selectedindex - 1]).style.display = "block";
  dots[this.selectedindex - 1].className += " active";
  setTimeout(() => this.showSlides(), 2000)
}



}
