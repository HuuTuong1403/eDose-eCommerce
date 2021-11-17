import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconcileDetailComponent } from './reconcile-detail.component';

describe('ReconcileDetailComponent', () => {
  let component: ReconcileDetailComponent;
  let fixture: ComponentFixture<ReconcileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconcileDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconcileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
