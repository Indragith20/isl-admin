import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { ITeamList } from 'src/app/interfaces/team-list.interface';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';
import { DashBoardService } from 'src/app/shared/dashboard.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-line-ups',
  templateUrl: './line-ups.component.html',
  styleUrls: ['./line-ups.component.css']
})
export class LineUpsComponent implements OnInit {
  gameId: string;
  teamOne: ITeamList;
  teamTwo: ITeamList;
  teamOnePlayerListSubmitted: boolean = false;
  teamTwoPlayerListSubmitted: boolean = false;

  constructor(private appService: CustomerService, private dashboardService: DashBoardService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.teamOne = this.appService.teamOne;
    this.teamTwo = this.appService.teamtwo;
    console.log(this.teamOne ? this.teamOne.playerList : '');
    console.log(this.teamTwo ? this.teamTwo.playerList : '');
    this.gameId = this.dashboardService.selectedMatchDetails ? this.dashboardService.selectedMatchDetails.game_id : '';
  }

  submitTeamOnePlayerList(playerList: IPlayerList[]) {
    console.log(playerList);
    this.teamOnePlayerListSubmitted = true;
    if(this.gameId) {
      this.dashboardService.modifyTeamDetails(this.gameId, playerList, 0).then((data) => {
        this.openSnackBar('TeamOneList Submitted');
      }).catch((err) => {
        this.openSnackBar('Something Bad Happened');
      });
    }
  }

  submitTeamTwoPlayerList(playerList: IPlayerList[]) {
    console.log(playerList);
    this.teamTwoPlayerListSubmitted = true;
    if(this.gameId) {
      this.dashboardService.modifyTeamDetails(this.gameId, playerList, 1).then((data) => {
        this.openSnackBar('TeamTwoList Submitted');
      }).catch((err) => {
        this.openSnackBar('Something Bad Happened');
      });
    }
  }

  sendNotification() {
    const notificationString = `${this.teamOne.teamName} - ${this.teamTwo.teamName}`;
    this.appService.sendNotification('Lineups Available', notificationString);
    // TODO: Convert above to promise
    this.openSnackBar('Notification Sent');
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
