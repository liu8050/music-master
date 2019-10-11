import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplayPage } from './videoplay.page';

describe('VideoplayPage', () => {
  let component: VideoplayPage;
  let fixture: ComponentFixture<VideoplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
