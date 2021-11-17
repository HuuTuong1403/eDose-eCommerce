import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageserviceComponent } from './packageservice.component';

describe('PackageserviceComponent', () => {
  let component: PackageserviceComponent;
  let fixture: ComponentFixture<PackageserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
