/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggedInGuardService } from './LoggedInGuard .service';

describe('Service: LoggedInGuard ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInGuardService]
    });
  });

  it('should ...', inject([LoggedInGuardService], (service: LoggedInGuardService) => {
    expect(service).toBeTruthy();
  }));
});