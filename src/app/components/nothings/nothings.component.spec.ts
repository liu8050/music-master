import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingsComponent } from './nothings.component';

describe('NothingsComponent', () => {
  let component: NothingsComponent;
  let fixture: ComponentFixture<NothingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NothingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NothingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
