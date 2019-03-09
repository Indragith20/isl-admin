import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { DashBoardService } from '../../../services/dashboard.service';
import { CustomerService } from '../../../services/customer.service';
import { ISelectItem } from 'src/app/interfaces/select-item.interface';
import { cards } from 'src/app/shared/constants/questions';
import { ITeamList } from 'src/app/interfaces/team-list.interface';
import { IPlayerList, IEventList, IEventPlayerDetails, IEventTeamDetails } from 'src/app/interfaces/player-list.interface';
import { ILiveMatchList } from 'src/app/interfaces/match-details.interface';
import { Subscription } from 'rxjs';
import { MainTimerComponent } from '../main-timer/main-timer.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-match-events',
  templateUrl: './match-events.component.html',
  styleUrls: ['./match-events.component.css']
})
export class MatchEventsComponent implements OnInit, OnDestroy {
  @ViewChild('timerref') timerRef: MainTimerComponent; 
  events: any[];
  teams: ISelectItem[];
  teamOneName: string;
  teamTwoName: string;
  gameId: string;
  teamOne: ITeamList;
  teamTwo: ITeamList; 
  teamOneId: string;
  teamTwoId: string;
  teamOnePlayersList: IPlayerList[];
  teamTwoPlayersList: IPlayerList[];
  scoreLineText: string;
  scoreLineTextSubscription: Subscription;

  constructor(private appService: CustomerService, private dashboardService: DashBoardService, public snackBar: MatSnackBar) {
    this.teamOneName = this.appService.teamOne ? this.appService.teamOne.teamName : 'Team 1';
    this.teamTwoName = this.appService.teamtwo ? this.appService.teamtwo.teamName : 'Team 2';
    this.gameId = this.dashboardService.selectedMatchDetails ? this.dashboardService.selectedMatchDetails.game_id : '';
    this.teamOne = this.appService.teamOne;
    this.teamTwo = this.appService.teamtwo;
    this.teamOneId = this.teamOne ? this.teamOne.teamId : '1';
    this.teamTwoId = this.teamTwo ? this.teamTwo.teamId: '2';
    this.teamOnePlayersList = this.teamOne ? this.teamOne.playerList: [];
    this.teamTwoPlayersList = this.teamOne ? this.teamTwo.playerList: [];
  }

  ngOnInit() {
    this.events = cards;
    this.scoreLineTextSubscription = this.dashboardService.scoreLine.subscribe((data) => {
      this.scoreLineText = data;
    })  
  }

  updateEventDetails(eventData: any) {
    if(eventData.eventName === 'Goal') {
      if(this.teamOneId === eventData.teamDetails.teamId) {
          this.dashboardService.updateHomeTeamScore().then((data) => {
            this.updateStatsData(eventData.eventName, true, eventData.playerDetails, eventData.teamDetails);
          });
      } else if(this.teamTwoId === eventData.teamDetails.teamId) {
          this.dashboardService.updateAwayTeamScore().then((data) => {
            this.updateStatsData(eventData.eventName, true, eventData.playerDetails, eventData.teamDetails);
          });
      } else {
        this.updateStatsData(eventData.eventName, true, eventData.playerDetails, eventData.teamDetails);
      }

    }
  }

  startMatch(event) {
    if(event) {
      const matchDetails: ILiveMatchList = {
        matchId: this.gameId,
        homeTeamId: this.teamOneId,
        homeTeamName: this.teamOneName,
        awayTeamId: this.teamTwoName,
        awayTeamName: this.teamTwoName,
        homeTeamScore: 0,
        awayTeamScore: 0
      }
      this.dashboardService.startLiveMatch(matchDetails).then((data) => {
        if(data) {
          this.updateStatsData('Kick off', false);
        }
      });
    }
  }

  updateStatsData(eventName: string, displayScore: boolean, playerDetails?: IEventPlayerDetails, teamDetails?: IEventTeamDetails) {
    let newEvent: IEventList = {
      eventName: eventName,
      scoreline: this.scoreLineText,
      time: this.timerRef.minutes
    };
    let modifiedEventName: string = eventName;
    let notificationString = displayScore ? `${this.teamOneName} ${this.scoreLineText} ${this.teamTwoName}` : `${this.teamOneName} - ${this.teamTwoName}`;
    if(playerDetails && teamDetails) {
      newEvent = { ...newEvent, playerDetails, teamDetails };
      notificationString = `${this.teamOneName} ${this.scoreLineText} ${this.teamTwoName}`;
      // TODO: Add Player Name and team name if necessary
      modifiedEventName = `${modifiedEventName} (${this.timerRef.minutes}')`
    }

    this.dashboardService.postEventsData(newEvent, this.gameId).then((data) => {
      this.dashboardService.sendNotification(modifiedEventName, notificationString);
      this.openSnackBar('Notification Sent');
    }).catch((err) => {
      this.openSnackBar('Something Bad Happened');
    });
  }

  endMatch(event) {
    this.updateStatsData('Match Ended', true);
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  ngOnDestroy() {
    this.scoreLineTextSubscription.unsubscribe();
  }

}
