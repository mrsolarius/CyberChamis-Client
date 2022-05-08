import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesDefisComponent } from './slides-defis.component';

describe('SlidesDefisComponent', () => {
  let component: SlidesDefisComponent;
  let fixture: ComponentFixture<SlidesDefisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidesDefisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesDefisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
