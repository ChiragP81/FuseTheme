import { TestBed } from '@angular/core/testing';

import { InstituteroleService } from './instituterole.service';

describe('InstituteroleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstituteroleService = TestBed.get(InstituteroleService);
    expect(service).toBeTruthy();
  });
});
