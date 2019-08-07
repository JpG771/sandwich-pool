import { TestBed } from '@angular/core/testing';

import { FirebaseAuthenticateService } from './firebase-authenticate.service';

describe('FirebaseAuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseAuthenticateService = TestBed.get(FirebaseAuthenticateService);
    expect(service).toBeTruthy();
  });
});
