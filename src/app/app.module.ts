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
import { StatsComponent } from './stats/stats.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyOwnCustomMaterialModule } from './app-material.module';
import { SelectMatchComponent } from './dashboard/select-match/select-match.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardService } from './shared/dashboard.service';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    CustomerComponent,
    CustomerListComponent,
    LineupsComponent,
    StatsComponent,
    NavbarComponent,
    EventsComponent,
    DashboardComponent,
    SelectMatchComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
