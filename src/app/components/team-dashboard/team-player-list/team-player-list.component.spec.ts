import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayerListComponent } from './team-player-list.component';

describe('TeamPlayerListComponent', () => {
  let component: TeamPlayerListComponent;
  let fixture: ComponentFixture<TeamPlayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
