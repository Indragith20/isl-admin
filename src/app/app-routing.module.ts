import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { LineupsComponent } from './lineups/lineups.component';
import { StatsComponent } from './stats/stats.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { EventsComponent } from './events/events.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  { path: 'news-dashboard', component: CustomerComponent },
  { path: 'lineups', component: LineupsComponent },
  { path: 'stats/:id', component: StatsComponent },
  { path: 'events/:id', component: EventsComponent },
  {path: '**', redirectTo: 'login'}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);