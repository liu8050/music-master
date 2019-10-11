import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaNumListPage } from './area-num-list.page';

describe('AreaNumListPage', () => {
  let component: AreaNumListPage;
  let fixture: ComponentFixture<AreaNumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaNumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaNumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
