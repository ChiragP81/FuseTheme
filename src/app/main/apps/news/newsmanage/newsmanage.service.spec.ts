import { TestBed } from '@angular/core/testing';

import { NewsmanageService } from './newsmanage.service';

describe('NewsmanageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsmanageService = TestBed.get(NewsmanageService);
    expect(service).toBeTruthy();
  });
});
