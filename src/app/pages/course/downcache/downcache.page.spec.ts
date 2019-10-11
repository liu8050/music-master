import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DowncachePage } from './downcache.page';

describe('DowncachePage', () => {
  let component: DowncachePage;
  let fixture: ComponentFixture<DowncachePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DowncachePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowncachePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
