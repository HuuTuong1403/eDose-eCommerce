import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBusinessComponent } from './dialog-business.component';

describe('DialogBusinessComponent', () => {
  let component: DialogBusinessComponent;
  let fixture: ComponentFixture<DialogBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
