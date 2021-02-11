import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyrideButtonPrevComponent } from './joyride-button-prev.component';

describe('JoyrideButtonPrevComponent', () => {
  let component: JoyrideButtonPrevComponent;
  let fixture: ComponentFixture<JoyrideButtonPrevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyrideButtonPrevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyrideButtonPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
