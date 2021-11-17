import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessBusinessComponent } from './order-process-business.component';

describe('OrderProcessBusinessComponent', () => {
  let component: OrderProcessBusinessComponent;
  let fixture: ComponentFixture<OrderProcessBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProcessBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProcessBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
