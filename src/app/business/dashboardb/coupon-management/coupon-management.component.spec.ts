import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponManagementComponent } from './coupon-management.component';

describe('CouponManagementComponent', () => {
  let component: CouponManagementComponent;
  let fixture: ComponentFixture<CouponManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
