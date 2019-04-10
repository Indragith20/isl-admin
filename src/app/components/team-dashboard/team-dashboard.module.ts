import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDashboardComponent } from './team-dashboard.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamsDashboardRoutingModule } from './team-dashboard-routing.module';
import { MyOwnCustomMaterialModule } from 'src/app/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { TeamAddEditComponent } from './team-add-edit/team-add-edit.component';
import { TeamPlayerListComponent } from './team-player-list/team-player-list.component';
import { TeamPlayerAddEditComponent } from './team-player-add-edit/team-player-add-edit.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { KeyCapitalize } from 'src/app/shared/pipes/key-capitalize.pipe';

@NgModule({
  imports: [
    CommonModule,
    MyOwnCustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TeamsDashboardRoutingModule,
  ],
  declarations: [
    TeamDashboardComponent,
    TeamListComponent,
    TeamAddEditComponent,
    TeamPlayerListComponent,
    TeamPlayerAddEditComponent,
    LoadingSpinnerComponent,
    KeyCapitalize
  ],
  entryComponents: [LoadingSpinnerComponent],
  providers: [TeamDetailsService],
  bootstrap: [TeamDashboardComponent]
})
export class TeamsDashboardModule { }
