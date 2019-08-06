import { TestBed } from '@angular/core/testing';

import { FirebaseSandwichService } from './sandwich.service';

describe('FirebaseSandwichService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseSandwichService = TestBed.get(FirebaseSandwichService);
    expect(service).toBeTruthy();
  });
});
