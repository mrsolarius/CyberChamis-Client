import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuDefiComponent } from './jeu-defi.component';

describe('JeuDefiComponent', () => {
  let component: JeuDefiComponent;
  let fixture: ComponentFixture<JeuDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeuDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
