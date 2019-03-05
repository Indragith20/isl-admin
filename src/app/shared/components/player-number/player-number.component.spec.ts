import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerNumberComponent } from './player-number.component';

describe('PlayerNumberComponent', () => {
  let component: PlayerNumberComponent;
  let fixture: ComponentFixture<PlayerNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
