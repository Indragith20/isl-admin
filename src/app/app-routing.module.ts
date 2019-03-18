import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LineupsComponent } from './components/lineups/lineups.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EventsComponent } from './components/events/events.component';
import { NewsDashboardComponent } from './components/news-dashboard/news-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'news-dashboard',
    component: NewsDashboardComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'lineups', component: LineupsComponent, canActivate: [AuthGuardService] },
  {
    path: 'dashboard',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule'
  },
  { path: 'events/:id', component: EventsComponent, canActivate: [AuthGuardService] },
  {
    path: 'teams-dashboard',
    loadChildren: './components/team-dashboard/team-dashboard.module#TeamsDashboardModule',
    canActivate: [AuthGuardService]
  }
  // {path: '**', redirectTo: 'login'}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
