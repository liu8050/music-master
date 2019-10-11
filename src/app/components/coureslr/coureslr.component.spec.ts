import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoureslrComponent } from './coureslr.component';

describe('CoureslrComponent', () => {
  let component: CoureslrComponent;
  let fixture: ComponentFixture<CoureslrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoureslrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoureslrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
