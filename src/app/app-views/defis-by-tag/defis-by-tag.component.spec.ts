import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefisByTagComponent } from './defis-by-tag.component';

describe('DefisByTagComponent', () => {
  let component: DefisByTagComponent;
  let fixture: ComponentFixture<DefisByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefisByTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefisByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
