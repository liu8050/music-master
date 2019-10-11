import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydiscountcouponPage } from './mydiscountcoupon.page';

describe('MydiscountcouponPage', () => {
  let component: MydiscountcouponPage;
  let fixture: ComponentFixture<MydiscountcouponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydiscountcouponPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydiscountcouponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
