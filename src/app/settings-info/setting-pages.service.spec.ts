import { TestBed } from '@angular/core/testing';

import { SettingPagesService } from './setting-pages.service';

describe('SettingPagesService', () => {
  let service: SettingPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
