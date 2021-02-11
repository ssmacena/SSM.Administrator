import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyrideButtonDoneComponent } from './joyride-button-done.component';

describe('JoyrideButtonDoneComponent', () => {
  let component: JoyrideButtonDoneComponent;
  let fixture: ComponentFixture<JoyrideButtonDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyrideButtonDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyrideButtonDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
