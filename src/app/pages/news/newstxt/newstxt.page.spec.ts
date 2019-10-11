import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstxtPage } from './newstxt.page';

describe('NewstxtPage', () => {
  let component: NewstxtPage;
  let fixture: ComponentFixture<NewstxtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstxtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstxtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
