import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationComponent } from './situation.component';

describe('SituationComponent', () => {
  let component: SituationComponent;
  let fixture: ComponentFixture<SituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
