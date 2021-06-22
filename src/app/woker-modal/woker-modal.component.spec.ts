import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WokerModalComponent } from './woker-modal.component';

describe('WokerModalComponent', () => {
  let component: WokerModalComponent;
  let fixture: ComponentFixture<WokerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WokerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WokerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
