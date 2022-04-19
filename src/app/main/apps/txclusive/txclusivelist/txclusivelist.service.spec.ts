import { TestBed } from '@angular/core/testing';

import { TxclusivelistService } from './txclusivelist.service';

describe('TxclusivelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TxclusivelistService = TestBed.get(TxclusivelistService);
    expect(service).toBeTruthy();
  });
});
