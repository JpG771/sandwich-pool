import { TestBed } from '@angular/core/testing';

import { FirebaseReservationService } from './reservation.service';

describe('FirebaseReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseReservationService = TestBed.get(FirebaseReservationService);
    expect(service).toBeTruthy();
  });
});
