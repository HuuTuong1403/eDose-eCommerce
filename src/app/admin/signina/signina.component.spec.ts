import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninaComponent } from './signina.component';

describe('SigninaComponent', () => {
  let component: SigninaComponent;
  let fixture: ComponentFixture<SigninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
