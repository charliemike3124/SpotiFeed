import { TestBed } from '@angular/core/testing';

import { SpotifyapiService } from './spotifyapi.service';

describe('SpotifyapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyapiService = TestBed.get(SpotifyapiService);
    expect(service).toBeTruthy();
  });
});
