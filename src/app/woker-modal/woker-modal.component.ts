import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-woker-modal',
  templateUrl: './woker-modal.component.html',
  styleUrls: ['./woker-modal.component.scss']
})
export class WokerModalComponent implements OnInit {

  profession=['Acoustics consultant','Architect','Architectural technician','Architectural technologist','Bricklayer','Builders merchant','Building control officer','Building services engineer','Building site inspector','Building surveyor', 'Building technician', 'Carpenter', 'Carpet fitter and floor layer', 'Cavity insulation installer' ,'Ceiling fixer', 'Construction contracts manager','Construction labourer','Construction manager','Construction site supervisor','Dry liner','Electrician', 'Facilities manager','Fence installer','Gas service technician','Gas mains layer','General practice surveyor','Glazier','Kitchen and bathroom fitter','Landscaper','Paint sprayer','Painter and decorator','Plasterer','Plumber','Quantity surveyor','Refrigeration and air-conditioning installer','Roofer','Scaffolder','Steel erector','Stonemason','Tiler','Welder','Water network operative','Window fitter','Wood machinist'];

  @Output('onResultWorker') onResultWorker:EventEmitter<boolean>=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onBack(value:boolean){
    this.onResultWorker.emit(value);
    console.log('onBack',value);
    }
}
