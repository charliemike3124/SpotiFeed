import { TestBed } from '@angular/core/testing';

import { RiotService } from './riot.service';

describe('RiotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiotService = TestBed.get(RiotService);
    expect(service).toBeTruthy();
  });
});
