import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLayoutComponent } from './single-layout.component';

describe('TrendLayoutComponent', () => {
  let component: SingleLayoutComponent;
  let fixture: ComponentFixture<SingleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
