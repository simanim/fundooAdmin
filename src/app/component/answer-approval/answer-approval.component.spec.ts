import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerApprovalComponent } from './answer-approval.component';

describe('AnswerApprovalComponent', () => {
  let component: AnswerApprovalComponent;
  let fixture: ComponentFixture<AnswerApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
