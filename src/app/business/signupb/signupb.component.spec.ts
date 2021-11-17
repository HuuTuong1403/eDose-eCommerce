import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupbComponent } from './signupb.component';

describe('SignupbComponent', () => {
  let component: SignupbComponent;
  let fixture: ComponentFixture<SignupbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
