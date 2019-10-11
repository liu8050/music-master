import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitieslistPage } from './activitieslist.page';

describe('ActivitieslistPage', () => {
  let component: ActivitieslistPage;
  let fixture: ComponentFixture<ActivitieslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitieslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitieslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
