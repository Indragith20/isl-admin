import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectMatchComponent } from './select-match/select-match.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';


const routes: Routes = [
    { path: '', redirectTo: 'selectmatch', pathMatch: 'full' },
    { path: 'selectmatch', component: SelectMatchComponent },
    { path: 'main-dashboard', component: MainDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }