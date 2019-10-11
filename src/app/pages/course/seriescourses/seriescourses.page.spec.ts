import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriescoursesPage } from './seriescourses.page';

describe('SeriescoursesPage', () => {
  let component: SeriescoursesPage;
  let fixture: ComponentFixture<SeriescoursesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriescoursesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriescoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
