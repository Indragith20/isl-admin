import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerService } from './shared/customer.service';
import { environment } from '../environments/environment';
import { routing } from './app-routing.module';
import { AuthGuardService } from './shared/auth-guard.service';
import { AppService } from './shared/app.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LineupsComponent } from './lineups/lineups.component';
import { DatePipe } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyOwnCustomMaterialModule } from './app-material.module';
import { SelectMatchComponent } from './dashboard/select-match/select-match.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardService } from './shared/dashboard.service';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { LineUpsComponent } from './dashboard/line-ups/line-ups.component';
import { MatchEventsComponent } from './dashboard/match-events/match-events.component';
import { MatchStatsComponent } from './dashboard/match-stats/match-stats.component';
import { TeamOneComponent } from './dashboard/team-one/team-one.component';
import { TeamTwoComponent } from './dashboard/team-two/team-two.component';
import { PlayerListComponent } from './shared/components/player-list/player-list.component';
import { MainTimerComponent } from './dashboard/main-timer/main-timer.component';
import { TeamEventsComponent } from './dashboard/team-events/team-events.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PlayerNumberComponent } from './shared/components/player-number/player-number.component';
import { PlayerActionComponent } from './player-action/player-action.component';

@NgModule({
  declarations: [
    SidebarComponent,
    LoginComponent,
    AppComponent,
    CustomerComponent,
    CustomerListComponent,
    LineupsComponent,
    EventsComponent,
    DashboardComponent,
    SelectMatchComponent,
    MainDashboardComponent,
    LineUpsComponent,
    MatchEventsComponent,
    MatchStatsComponent,
    PlayerListComponent,
    TeamOneComponent,
    TeamTwoComponent,
    MainTimerComponent,
    TeamEventsComponent,
    PlayerNumberComponent,
    PlayerActionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MyOwnCustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    CustomerService, AppService, AuthGuardService, AngularFireAuth,
    AngularFirestore, DatePipe,
    DashBoardService
  ],
  entryComponents: [PlayerActionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
