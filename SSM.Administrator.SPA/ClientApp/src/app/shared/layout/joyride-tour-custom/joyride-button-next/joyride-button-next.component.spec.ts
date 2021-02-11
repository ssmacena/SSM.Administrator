import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyrideButtonNextComponent } from './joyride-button-next.component';

describe('JoyrideButtonNextComponent', () => {
  let component: JoyrideButtonNextComponent;
  let fixture: ComponentFixture<JoyrideButtonNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyrideButtonNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyrideButtonNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
