import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderPage } from './myorder.page';

describe('MyorderPage', () => {
  let component: MyorderPage;
  let fixture: ComponentFixture<MyorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyorderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
