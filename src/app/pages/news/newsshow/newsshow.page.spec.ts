import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsshowPage } from './newsshow.page';

describe('NewsshowPage', () => {
  let component: NewsshowPage;
  let fixture: ComponentFixture<NewsshowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsshowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
