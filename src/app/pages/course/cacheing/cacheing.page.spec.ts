import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheingPage } from './cacheing.page';

describe('CacheingPage', () => {
  let component: CacheingPage;
  let fixture: ComponentFixture<CacheingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacheingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
