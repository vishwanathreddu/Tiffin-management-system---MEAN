import { TestBed } from '@angular/core/testing';

import { TiffinService } from './tiffin.service';

describe('TiffinService', () => {
  let service: TiffinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiffinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
