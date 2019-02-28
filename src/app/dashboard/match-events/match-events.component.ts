import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/shared/dashboard.service';
import { CustomerService } from 'src/app/shared/customer.service';
import { ISelectItem } from 'src/app/interfaces/select-item.interface';
import { cards } from 'src/app/shared/constants/questions';

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

  constructor(private appService: CustomerService, private dashboardService: DashBoardService) {
    this.teamOneName = this.appService.teamOne ? this.appService.teamOne.teamName : 'Team 1';
    this.teamTwoName = this.appService.teamtwo ? this.appService.teamOne.teamName : 'Team 2';
    this.gameId = this.dashboardService.selectedMatchDetails ? this.dashboardService.selectedMatchDetails.game_id : '';
  }

  ngOnInit() {
    this.events = cards;
  }

}
