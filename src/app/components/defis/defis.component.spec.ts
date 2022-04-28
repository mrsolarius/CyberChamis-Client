import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefisComponent } from './defis.component';

describe('DefisComponent', () => {
  let component: DefisComponent;
  let fixture: ComponentFixture<DefisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
