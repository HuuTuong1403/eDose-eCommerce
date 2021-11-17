import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassFgBComponent } from './change-pass-fg-b.component';

describe('ChangePassFgBComponent', () => {
  let component: ChangePassFgBComponent;
  let fixture: ComponentFixture<ChangePassFgBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePassFgBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassFgBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
