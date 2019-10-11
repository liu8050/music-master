import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsslotComponent } from './newsslot.component';

describe('NewsslotComponent', () => {
  let component: NewsslotComponent;
  let fixture: ComponentFixture<NewsslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
