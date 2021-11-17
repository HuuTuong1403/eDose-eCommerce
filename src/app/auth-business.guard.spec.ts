import { TestBed } from '@angular/core/testing';

import { AuthBusinessGuard } from './auth-business.guard';

describe('AuthBusinessGuard', () => {
  let guard: AuthBusinessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthBusinessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
