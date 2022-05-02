import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeIndicativeComponent } from './etape-indicative.component';

describe('EtapeIndicativeComponent', () => {
  let component: EtapeIndicativeComponent;
  let fixture: ComponentFixture<EtapeIndicativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapeIndicativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeIndicativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
