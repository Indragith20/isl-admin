import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { LineupsComponent } from './lineups/lineups.component';
import { StatsComponent } from './stats/stats.component';
import { AuthGuardService } from './shared/auth-guard.service';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  { path: 'news-dashboard', component: CustomerComponent, canActivate: [AuthGuardService] },
  { path: 'lineups', component: LineupsComponent, canActivate: [AuthGuardService] },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuardService] },
  {path: '**', redirectTo: 'login'}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);