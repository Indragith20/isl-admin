import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerComponent } from './components/news-dashboard/customer/customer.component';
import { CustomerListComponent } from './components/news-dashboard/customer-list/customer-list.component';
import { CustomerService } from './services/customer.service';
import { environment } from '../environments/environment';
import { routing } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AppService } from './services/app.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LineupsComponent } from './components/lineups/lineups.component';
import { DatePipe } from '@angular/common';
import { EventsComponent } from './components/events/events.component';
import { MyOwnCustomMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardService } from './services/dashboard.service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PlayerNumberComponent } from './shared/components/player-number/player-number.component';
import { PlayerActionComponent } from './components/player-action/player-action.component';
import { NewsDashboardComponent } from './components/news-dashboard/news-dashboard.component';
import { ExcelService } from './services/excel.service';

@NgModule({
  declarations: [
    SidebarComponent,
    LoginComponent,
    AppComponent,
    CustomerComponent,
    CustomerListComponent,
    LineupsComponent,
    EventsComponent,
    NewsDashboardComponent,
    PlayerNumberComponent,
    PlayerActionComponent,
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
    DashBoardService,
    ExcelService
  ],
  entryComponents: [PlayerActionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
