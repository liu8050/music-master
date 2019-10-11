import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingphonePage } from './bingphone.page';

describe('BingphonePage', () => {
  let component: BingphonePage;
  let fixture: ComponentFixture<BingphonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingphonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingphonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
