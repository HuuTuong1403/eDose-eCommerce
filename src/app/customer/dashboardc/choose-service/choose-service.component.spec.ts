import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseServiceComponent } from './choose-service.component';

describe('ChooseServiceComponent', () => {
  let component: ChooseServiceComponent;
  let fixture: ComponentFixture<ChooseServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
