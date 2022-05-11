import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefiCreatedComponent } from './defi-created.component';

describe('DefiCreatedComponent', () => {
  let component: DefiCreatedComponent;
  let fixture: ComponentFixture<DefiCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefiCreatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefiCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
