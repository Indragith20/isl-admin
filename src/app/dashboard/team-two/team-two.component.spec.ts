import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTwoComponent } from './team-two.component';

describe('TeamTwoComponent', () => {
  let component: TeamTwoComponent;
  let fixture: ComponentFixture<TeamTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
