import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { DashBoardService } from '../../../services/dashboard.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css']
})
export class MatchStatsComponent implements OnInit {
  statsData: any[] = [];
  teamOneName: string = '';
  teamTwoName: string = '';
  gameId: string;

  constructor(private appService: CustomerService, private dashboardService: DashBoardService, public snackBar: MatSnackBar) {
    this.teamOneName = this.appService.teamOne ? this.appService.teamOne.teamName : 'Team 1';
    this.teamTwoName = this.appService.teamtwo ? this.appService.teamOne.teamName : 'Team 2';
    this.gameId = this.dashboardService.selectedMatchDetails ? this.dashboardService.selectedMatchDetails.game_id : '';
    this.formStats();
  }

  ngOnInit() {
  }

  formStats() {
    this.statsData = [{
      stats: 'Possession',
      [this.teamOneName]: '',
      [this.teamTwoName]: ''
    }, {
      stats: 'Goals',
      [this.teamOneName]: '',
      [this.teamTwoName]: ''
    }, {
      stats: 'Pass Accuracy',
      [this.teamOneName]: '',
      [this.teamTwoName]: ''
    }, {
      stats: 'Offsides',
      [this.teamOneName]: '',
      [this.teamTwoName]: ''
    }, {
      stats: 'Shots on Target',
      [this.teamOneName]: '',
      [this.teamTwoName]: ''
    }, {
      stats: 'Fouls',
      [this.teamOneName]: '',
      [this.teamTwoName]: ''
    }, {
      stats: 'Corners',
      [this.teamOneName]: '',
      [this.teamTwoName]: ''
    }, {
      stats: 'Red Cards',
      [this.teamOneName]: '',
      [this.teamTwoName]: ''
    }, {
      stats: 'Yellow Cards',
      [this.teamOneName]: '',
      [this.teamTwoName]: ''
    }];
  }

  submitStats() {
    console.log(this.statsData);
    this.appService.submitStatsData(this.gameId, this.statsData)
      .then((data) => {
        this.appService.sendNotification('Stats Available', `${this.teamOneName}-${this.teamTwoName}`);
        this.openSnackBar('Notification Sent');
      }).catch((err) => {
        this.openSnackBar('Something Bad Happened');
      });
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
