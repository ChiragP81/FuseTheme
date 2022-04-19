import { TestBed } from '@angular/core/testing';

import { InstitutelistService } from './institutelist.service';

describe('InstitutelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstitutelistService = TestBed.get(InstitutelistService);
    expect(service).toBeTruthy();
  });
});
