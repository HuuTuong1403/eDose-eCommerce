import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryManagementComponent } from './delivery-management.component';

describe('DeliveryManagementComponent', () => {
  let component: DeliveryManagementComponent;
  let fixture: ComponentFixture<DeliveryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
