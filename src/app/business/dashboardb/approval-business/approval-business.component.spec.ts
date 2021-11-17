import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalBusinessComponent } from './approval-business.component';

describe('ApprovalBusinessComponent', () => {
  let component: ApprovalBusinessComponent;
  let fixture: ComponentFixture<ApprovalBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
