import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllseriescoursePage } from './allseriescourse.page';

describe('AllseriescoursePage', () => {
  let component: AllseriescoursePage;
  let fixture: ComponentFixture<AllseriescoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllseriescoursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllseriescoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
