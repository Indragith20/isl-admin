import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayerAddEditComponent } from './team-player-add-edit.component';

describe('TeamPlayerAddEditComponent', () => {
  let component: TeamPlayerAddEditComponent;
  let fixture: ComponentFixture<TeamPlayerAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayerAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
