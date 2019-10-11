import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CachefinishedPage } from './cachefinished.page';

describe('CachefinishedPage', () => {
  let component: CachefinishedPage;
  let fixture: ComponentFixture<CachefinishedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CachefinishedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CachefinishedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
