import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoCommentUserComponent } from './histo-comment-user.component';

describe('HistoCommentUserComponent', () => {
  let component: HistoCommentUserComponent;
  let fixture: ComponentFixture<HistoCommentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoCommentUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoCommentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
