import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcComponent } from './dashboardc.component';

describe('DashboardcComponent', () => {
  let component: DashboardcComponent;
  let fixture: ComponentFixture<DashboardcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
