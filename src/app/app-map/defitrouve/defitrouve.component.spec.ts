import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefitrouveComponent } from './defitrouve.component';

describe('DefitrouveComponent', () => {
  let component: DefitrouveComponent;
  let fixture: ComponentFixture<DefitrouveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefitrouveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefitrouveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
