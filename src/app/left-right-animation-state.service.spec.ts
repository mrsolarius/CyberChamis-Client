import { TestBed } from '@angular/core/testing';

import { LeftRightAnimationStateService } from './left-right-animation-state.service';

describe('LeftRightAnimationStateService', () => {
  let service: LeftRightAnimationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftRightAnimationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
