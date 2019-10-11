import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideolistPage } from './videolist.page';

describe('VideolistPage', () => {
  let component: VideolistPage;
  let fixture: ComponentFixture<VideolistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideolistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideolistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
