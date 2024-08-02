import { TestBed } from '@angular/core/testing';

import { InpectorServiceService } from './inpector-service.service';

describe('InpectorServiceService', () => {
  let service: InpectorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InpectorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
