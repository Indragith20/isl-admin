import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDashboardComponent } from './team-dashboard.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamsDashboardRoutingModule } from './team-dashboard-routing.module';
import { MyOwnCustomMaterialModule } from 'src/app/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamDetailsService } from 'src/app/services/team-details.service';

@NgModule({
  imports: [
    CommonModule,
    MyOwnCustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TeamsDashboardRoutingModule
  ],
  declarations: [TeamDashboardComponent, TeamListComponent, TeamDetailsComponent],
  providers: [TeamDetailsService],
  bootstrap: [TeamDashboardComponent]
})
export class TeamsDashboardModule { }
