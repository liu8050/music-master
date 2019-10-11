import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsoupPage } from './msoup.page';

describe('MsoupPage', () => {
  let component: MsoupPage;
  let fixture: ComponentFixture<MsoupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsoupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsoupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
