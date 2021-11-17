import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCComponent } from './statistic-c.component';

describe('StatisticCComponent', () => {
  let component: StatisticCComponent;
  let fixture: ComponentFixture<StatisticCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
