import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmasterPage } from './mmaster.page';

describe('MmasterPage', () => {
  let component: MmasterPage;
  let fixture: ComponentFixture<MmasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmasterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
