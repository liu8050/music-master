import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedPage } from './ordered.page';

describe('OrderedPage', () => {
  let component: OrderedPage;
  let fixture: ComponentFixture<OrderedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
