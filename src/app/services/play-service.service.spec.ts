import { TestBed } from '@angular/core/testing';

import { PlayServiceService } from './play-service.service';

describe('PlayServiceService', () => {
  let service: PlayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
