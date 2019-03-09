import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LineupsComponent } from './components/lineups/lineups.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EventsComponent } from './components/events/events.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelectMatchComponent } from './components/dashboard/select-match/select-match.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
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
