import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidancePage } from './guidance.page';

describe('GuidancePage', () => {
  let component: GuidancePage;
  let fixture: ComponentFixture<GuidancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
