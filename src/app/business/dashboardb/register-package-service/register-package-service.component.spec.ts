import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPackageServiceComponent } from './register-package-service.component';

describe('RegisterPackageServiceComponent', () => {
  let component: RegisterPackageServiceComponent;
  let fixture: ComponentFixture<RegisterPackageServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPackageServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPackageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
