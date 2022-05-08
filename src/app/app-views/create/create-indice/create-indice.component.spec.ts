import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIndiceComponent } from './create-indice.component';

describe('CreateIndiceComponent', () => {
  let component: CreateIndiceComponent;
  let fixture: ComponentFixture<CreateIndiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIndiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIndiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
