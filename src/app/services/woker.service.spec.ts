import { TestBed } from '@angular/core/testing';

import { WokerService } from './woker.service';

describe('WokerService', () => {
  let service: WokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
