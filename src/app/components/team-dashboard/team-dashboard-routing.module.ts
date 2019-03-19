import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamAddEditComponent } from './team-add-edit/team-add-edit.component';
import { TeamPlayerAddEditComponent } from './team-player-add-edit/team-player-add-edit.component';
import { TeamPlayerListComponent } from './team-player-list/team-player-list.component';


const routes: Routes = [
    { path: '', redirectTo: 'teams-list', pathMatch: 'full' },
    { path: 'teams-list', component: TeamListComponent },
    { path: 'teams-details', component: TeamAddEditComponent },
    { path: 'player-list/:teamName', component: TeamPlayerListComponent },
    { path: 'player-add-edit/:playerName', component: TeamPlayerAddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsDashboardRoutingModule { }