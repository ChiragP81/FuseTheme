import { TestBed } from '@angular/core/testing';

import { InstituterequestService } from './instituterequest.service';

describe('InstituterequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstituterequestService = TestBed.get(InstituterequestService);
    expect(service).toBeTruthy();
  });
});
