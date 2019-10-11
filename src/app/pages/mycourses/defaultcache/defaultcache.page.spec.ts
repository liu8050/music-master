import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultcachePage } from './defaultcache.page';

describe('DefaultcachePage', () => {
  let component: DefaultcachePage;
  let fixture: ComponentFixture<DefaultcachePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultcachePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultcachePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
