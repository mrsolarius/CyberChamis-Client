import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteProfileComponent } from './visite-profile.component';

describe('VisiteProfileComponent', () => {
  let component: VisiteProfileComponent;
  let fixture: ComponentFixture<VisiteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
