import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOwnCustomMaterialModule } from 'src/app/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectMatchComponent } from './select-match/select-match.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { LineUpsComponent } from './line-ups/line-ups.component';
import { MatchEventsComponent } from './match-events/match-events.component';
import { MatchStatsComponent } from './match-stats/match-stats.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PlayerListComponent } from 'src/app/shared/components/player-list/player-list.component';
import { TeamTwoComponent } from './team-two/team-two.component';
import { TeamOneComponent } from './team-one/team-one.component';
import { MainTimerComponent } from './main-timer/main-timer.component';
import { TeamEventsComponent } from './team-events/team-events.component';
import { Keyobject } from 'src/app/shared/pipes/keys-transform.pipe';

@NgModule({
    imports: [
        CommonModule,
        MyOwnCustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule
    ],
    declarations: [
        SelectMatchComponent,
        MainDashboardComponent,
        DashboardComponent,
        LineUpsComponent,
        MatchEventsComponent,
        MatchStatsComponent,
        PlayerListComponent,
        TeamOneComponent,
        TeamTwoComponent,
        MainTimerComponent,
        TeamEventsComponent,
        Keyobject
    ],
})
export class DashboardModule { }
