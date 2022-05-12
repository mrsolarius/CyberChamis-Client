import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTendanceComponent } from './tag-tendance.component';

describe('TagTendanceComponent', () => {
  let component: TagTendanceComponent;
  let fixture: ComponentFixture<TagTendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagTendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagTendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
