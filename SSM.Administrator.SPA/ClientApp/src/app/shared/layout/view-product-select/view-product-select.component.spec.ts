import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductSelectComponent } from './view-product-select.component';

describe('ViewProductSelectComponent', () => {
  let component: ViewProductSelectComponent;
  let fixture: ComponentFixture<ViewProductSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
