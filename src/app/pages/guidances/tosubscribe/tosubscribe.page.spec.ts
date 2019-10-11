import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TosubscribePage } from './tosubscribe.page';

describe('TosubscribePage', () => {
  let component: TosubscribePage;
  let fixture: ComponentFixture<TosubscribePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TosubscribePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TosubscribePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
