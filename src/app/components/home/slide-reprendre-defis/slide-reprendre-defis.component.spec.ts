import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideReprendreDefisComponent } from './slide-reprendre-defis.component';

describe('SlideReprendreDefisComponent', () => {
  let component: SlideReprendreDefisComponent;
  let fixture: ComponentFixture<SlideReprendreDefisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideReprendreDefisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideReprendreDefisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
