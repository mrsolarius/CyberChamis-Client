import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefiInfoComponent } from './defi-info.component';

describe('DefiInfoComponent', () => {
  let component: DefiInfoComponent;
  let fixture: ComponentFixture<DefiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefiInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
