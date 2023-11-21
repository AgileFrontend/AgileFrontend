import { TestBed } from '@angular/core/testing';

import { DisplayProfileService } from './display-profile.service';

describe('DisplayProfileService', () => {
  let service: DisplayProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
