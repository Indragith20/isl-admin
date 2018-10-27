import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { LineupsComponent } from './lineups/lineups.component';
import { StatsComponent } from './stats/stats.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectMatchComponent } from './dashboard/select-match/select-match.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  { path: 'news-dashboard', component: CustomerComponent, canActivate: [AuthGuardService] },
  { path: 'lineups', component: LineupsComponent, canActivate: [AuthGuardService] },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'selectmatch', pathMatch: 'full' },
      { path: 'selectmatch', component: SelectMatchComponent },
      { path: 'main-dashboard', component: MainDashboardComponent }
    ]
  },
  { path: 'events/:id', component: EventsComponent, canActivate: [AuthGuardService] },
  // {path: '**', redirectTo: 'login'}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);