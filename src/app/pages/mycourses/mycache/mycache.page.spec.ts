import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycachePage } from './mycache.page';

describe('MycachePage', () => {
  let component: MycachePage;
  let fixture: ComponentFixture<MycachePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycachePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycachePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
