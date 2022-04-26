import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamisComponent } from './chamis.component';

describe('ChamisComponent', () => {
  let component: ChamisComponent;
  let fixture: ComponentFixture<ChamisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
