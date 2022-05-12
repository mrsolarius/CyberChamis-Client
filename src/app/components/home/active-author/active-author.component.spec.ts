import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAuthorComponent } from './active-author.component';

describe('ActiveAuthorComponent', () => {
  let component: ActiveAuthorComponent;
  let fixture: ComponentFixture<ActiveAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
