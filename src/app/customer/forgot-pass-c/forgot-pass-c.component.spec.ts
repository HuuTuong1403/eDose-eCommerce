import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassCComponent } from './forgot-pass-c.component';

describe('ForgotPassCComponent', () => {
  let component: ForgotPassCComponent;
  let fixture: ComponentFixture<ForgotPassCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPassCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
