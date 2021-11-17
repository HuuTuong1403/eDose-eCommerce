import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassFgComponent } from './change-pass-fg.component';

describe('ChangePassFgComponent', () => {
  let component: ChangePassFgComponent;
  let fixture: ComponentFixture<ChangePassFgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePassFgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassFgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
