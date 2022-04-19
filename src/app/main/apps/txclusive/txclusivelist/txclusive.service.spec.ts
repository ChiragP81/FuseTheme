import { TestBed } from '@angular/core/testing';

import { TxclusiveService } from './txclusive.service';

describe('TxclusiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TxclusiveService = TestBed.get(TxclusiveService);
    expect(service).toBeTruthy();
  });
});
