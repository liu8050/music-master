import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymoneyPage } from './mymoney.page';

describe('MymoneyPage', () => {
  let component: MymoneyPage;
  let fixture: ComponentFixture<MymoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymoneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
