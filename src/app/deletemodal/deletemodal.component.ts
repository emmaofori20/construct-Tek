import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.scss']
})
export class DeletemodalComponent implements OnInit {

  @Input() title: string;
  constructor() { }

  @Output("onResult") OnResult:EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
  }

  chooseOption(value:boolean){

    this.OnResult.emit(value);

  }

}
