import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassBComponent } from './forgot-pass-b.component';

describe('ForgotPassBComponent', () => {
  let component: ForgotPassBComponent;
  let fixture: ComponentFixture<ForgotPassBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPassBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
