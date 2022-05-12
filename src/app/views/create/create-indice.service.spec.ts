import { TestBed } from '@angular/core/testing';

import { CreateIndiceService } from './create-indice.service';

describe('CreateIndiceService', () => {
  let service: CreateIndiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateIndiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
