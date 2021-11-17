import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardbComponent } from './dashboardb.component';

describe('DashboardbComponent', () => {
  let component: DashboardbComponent;
  let fixture: ComponentFixture<DashboardbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
