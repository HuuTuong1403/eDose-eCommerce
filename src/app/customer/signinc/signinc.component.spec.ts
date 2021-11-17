import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignincComponent } from './signinc.component';

describe('SignincComponent', () => {
  let component: SignincComponent;
  let fixture: ComponentFixture<SignincComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignincComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
