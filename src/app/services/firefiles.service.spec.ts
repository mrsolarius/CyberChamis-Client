import { TestBed } from '@angular/core/testing';

import { FirefilesService } from './firefiles.service';

describe('FirefilesService', () => {
  let service: FirefilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirefilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
