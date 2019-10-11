import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlsComponent } from './orderls.component';

describe('OrderlsComponent', () => {
  let component: OrderlsComponent;
  let fixture: ComponentFixture<OrderlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
