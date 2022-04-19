import { TestBed } from '@angular/core/testing';

import { TrivialistService } from './trivialist.service';

describe('TrivialistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrivialistService = TestBed.get(TrivialistService);
    expect(service).toBeTruthy();
  });
});
