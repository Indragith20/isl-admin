import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDashboardComponent } from './team-dashboard.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamsDashboardRoutingModule } from './team-dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TeamsDashboardRoutingModule
  ],
  declarations: [TeamDashboardComponent, TeamListComponent, TeamDetailsComponent],
  bootstrap: [TeamDashboardComponent]
})
export class TeamsDashboardModule { }