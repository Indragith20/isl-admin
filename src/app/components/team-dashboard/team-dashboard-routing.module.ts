import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailsComponent } from './team-details/team-details.component';


const routes: Routes = [
    { path: '', component: TeamListComponent },
    { path: 'teams-list', component: TeamListComponent },
    { path: 'teams-details', component: TeamDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsDashboardRoutingModule { }