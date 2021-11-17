import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconcileBusinessComponent } from './reconcile-business.component';

describe('ReconcileBusinessComponent', () => {
  let component: ReconcileBusinessComponent;
  let fixture: ComponentFixture<ReconcileBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconcileBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconcileBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
