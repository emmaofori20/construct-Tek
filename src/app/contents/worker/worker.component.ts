import { Component,  OnInit, } from '@angular/core';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {

  worker=false;
  constructor() { }

  ngOnInit(): void {
  }

  onWorker(){
    this.worker=true;
  }

  onModalResult(e){
    console.log(e);
    this.worker=false;
  }


}
