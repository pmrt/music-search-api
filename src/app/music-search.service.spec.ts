/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MusicSearchService } from './music-search.service';

describe('MusicSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicSearchService]
    });
  });

  it('should ...', inject([MusicSearchService], (service: MusicSearchService) => {
    expect(service).toBeTruthy();
  }));
});
