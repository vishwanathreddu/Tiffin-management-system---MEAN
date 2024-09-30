import { TestBed } from '@angular/core/testing';

import { AdminTiffinStateService } from './admin-tiffin-state.service';

describe('AdminTiffinStateService', () => {
  let service: AdminTiffinStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTiffinStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
