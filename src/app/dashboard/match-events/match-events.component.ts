import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/shared/dashboard.service';
import { CustomerService } from 'src/app/shared/customer.service';
import { ISelectItem } from 'src/app/interfaces/select-item.interface';
import { cards } from 'src/app/shared/constants/questions';
import { ITeamList } from 'src/app/interfaces/team-list.interface';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';

@Component({
  selector: 'app-match-events',
  templateUrl: './match-events.component.html',
  styleUrls: ['./match-events.component.css']
})
export class MatchEventsComponent implements OnInit {
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

  constructor(private appService: CustomerService, private dashboardService: DashBoardService) {
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
  }

}
