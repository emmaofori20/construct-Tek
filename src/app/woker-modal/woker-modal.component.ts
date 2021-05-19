import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-woker-modal',
  templateUrl: './woker-modal.component.html',
  styleUrls: ['./woker-modal.component.scss']
})
export class WokerModalComponent implements OnInit {

  @Output('onResultWorker') onResultWorker:EventEmitter<boolean>=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onBack(value:boolean){
    this.onResultWorker.emit(value);
    console.log('onBack',value);
    }
}
