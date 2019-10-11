import { TestBed } from '@angular/core/testing';

import { AreaCodeService } from './area-code.service';

describe('AreaCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaCodeService = TestBed.get(AreaCodeService);
    expect(service).toBeTruthy();
  });
});
