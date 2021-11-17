import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupcComponent } from './signupc.component';

describe('SignupcComponent', () => {
  let component: SignupcComponent;
  let fixture: ComponentFixture<SignupcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
