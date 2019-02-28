import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTimerComponent } from './main-timer.component';

describe('MainTimerComponent', () => {
  let component: MainTimerComponent;
  let fixture: ComponentFixture<MainTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
