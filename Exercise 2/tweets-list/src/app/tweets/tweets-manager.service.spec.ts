import { TestBed } from '@angular/core/testing';

import { TweetsManagerService } from './tweets-manager.service';

describe('TweetsManagerService', () => {
  let service: TweetsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
