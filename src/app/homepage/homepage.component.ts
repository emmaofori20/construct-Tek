import { keyframes } from '@angular/animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/interceptors/loader.service';
import { DataService } from '../services/data.service';
import { ProjectService } from '../services/project.service';
import { WorkerService } from '../services/woker.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  allWokers: any = [];
  nameofCategory:any;
  projects: any;
  p: Number = 1;
  c:Number=1
  count: Number = 4;

  constructor(
    private worker: WorkerService,
    private activatedroute: ActivatedRoute,
    private loaderService: LoaderService,
    private data: DataService,
    private router: Router,
    private projectservice: ProjectService
  ) {
    this.projectservice.getUserproject().subscribe((res:any)=>{
      this.projects = res;
      console.log("the projects of the user", res)
    })
  }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) => {
      console.log('these are the activated route', params.name);
      this.nameofCategory=params.name;
      console.log('the name of the category', this.nameofCategory)
    });
     //all the workers
     this.getallwokersofaCategory();
  }
  //open worker
  openWorker(worker) {
    console.log('worker', worker);
    this.router.navigate(['dashboard/content/worker', worker.id]);
  }

  getallwokersofaCategory() {
    try {
      this.loaderService.setHttpProgressStatus(true);
      this.worker.getcategoryworkers(this.nameofCategory).subscribe((res:any) => {
        this.allWokers = res;
        console.log('all the workers response', res);
        console.log('all the workers', this.allWokers);
        this.loaderService.setHttpProgressStatus(false);
      });
    } catch (error) {
      this.loaderService.setHttpProgressStatus(false);
      console.log(error.message);
    }
  }


  updateSearch(searchTextValue: string) {
    if (searchTextValue) {
      document.getElementById('workers').style.display = 'none';
      document.getElementById('searchResults').style.display = 'flex';
      this.data.search(searchTextValue);
      console.log(searchTextValue);
    } else {
      document.getElementById('workers').style.display = 'flex';
      document.getElementById('searchResults').style.display = 'none';
    }
  }
}
