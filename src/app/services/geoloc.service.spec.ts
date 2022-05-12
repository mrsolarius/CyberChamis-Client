import { TestBed } from '@angular/core/testing';

import { GeolocService } from './geoloc.service';

describe('GeolocService', () => {
  let service: GeolocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
