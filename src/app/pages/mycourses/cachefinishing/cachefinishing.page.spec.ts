import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CachefinishingPage } from './cachefinishing.page';

describe('CachefinishingPage', () => {
  let component: CachefinishingPage;
  let fixture: ComponentFixture<CachefinishingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CachefinishingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CachefinishingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
