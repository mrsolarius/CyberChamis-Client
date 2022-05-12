import { TestBed } from '@angular/core/testing';

import { CreateEtapeService } from './create-etape.service';

describe('CreateEtapeService', () => {
  let service: CreateEtapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEtapeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
