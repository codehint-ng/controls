import { TestBed } from '@angular/core/testing';

import { CodehintNgTabsService } from './codehint-ng-tabs.service';

describe('CodehintNgTabsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodehintNgTabsService = TestBed.get(CodehintNgTabsService);
    expect(service).toBeTruthy();
  });
});
