import { TestBed } from '@angular/core/testing';

import { NewslistService } from './newslist.service';

describe('NewslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewslistService = TestBed.get(NewslistService);
    expect(service).toBeTruthy();
  });
});
