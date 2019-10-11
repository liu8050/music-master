import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemnewsPage } from './systemnews.page';

describe('SystemnewsPage', () => {
  let component: SystemnewsPage;
  let fixture: ComponentFixture<SystemnewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemnewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemnewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
