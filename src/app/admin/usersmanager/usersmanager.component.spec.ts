import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersmanagerComponent } from './usersmanager.component';

describe('UsersmanagerComponent', () => {
  let component: UsersmanagerComponent;
  let fixture: ComponentFixture<UsersmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
