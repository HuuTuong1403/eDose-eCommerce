import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSituationComponent } from './business-situation.component';

describe('BusinessSituationComponent', () => {
  let component: BusinessSituationComponent;
  let fixture: ComponentFixture<BusinessSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSituationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
