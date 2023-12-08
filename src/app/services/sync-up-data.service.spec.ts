import { TestBed } from '@angular/core/testing';

import { SyncUpDataService } from './sync-up-data.service';

describe('SyncUpDataService', () => {
  let service: SyncUpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncUpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
