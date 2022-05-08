import { TestBed } from '@angular/core/testing';

import { MetroboliliteService } from './metrobolilite.service';

describe('MetroboliliteService', () => {
  let service: MetroboliliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetroboliliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
