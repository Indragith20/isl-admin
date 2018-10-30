import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashBoardService } from 'src/app/shared/dashboard.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/customer.service';
import { combineLatest } from 'rxjs';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';
import { ITeamList } from 'src/app/interfaces/team-list.interface';
import { IMatchDetails } from 'src/app/interfaces/match-details.interface';


@Component({
  selector: 'app-select-match',
  templateUrl: './select-match.component.html',
  styleUrls: ['./select-match.component.css']
})
export class SelectMatchComponent implements OnInit {
  selectedDate: Date;
  showMatch: boolean = false;
  warningMessage: string = 'Please Select the Date';
  matchDetails: any;
  teamOne: ITeamList;
  teamTwo: ITeamList;

  constructor(private datePipe: DatePipe, private dashboardService: DashBoardService,
      private router: Router, private appService: CustomerService) { }

  ngOnInit() {
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    this.getMatches();
  }

  getMatches() {
    let searchDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    searchDateString = `${searchDateString}T19:30+05:30`;
    console.log(searchDateString);
    this.dashboardService.getMatchByDate(searchDateString)
      .then((data: IMatchDetails) => {
        this.showMatch = true;
        this.matchDetails = data;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        this.warningMessage = 'Something Bad Happened..Please Try Again';
      });
  }

  showDashboard() {
    const teamOneDetails$ = this.appService.getPlayerDetails(this.matchDetails.participants[0].id);
    const teamTwoDetails$ = this.appService.getPlayerDetails(this.matchDetails.participants[1].id);
    const combined = combineLatest(teamOneDetails$, teamTwoDetails$);
    combined.subscribe(([teamOneDetails, teamTwoDetails]) => {
      this.formatTeamPlayersList(teamOneDetails, teamTwoDetails);
      this.router.navigate(['dashboard/main-dashboard']);
    });
  }

  formatTeamPlayersList(teamOne, teamTwo) {
    this.teamOne = {
      teamName: this.matchDetails.participants[0].name,
      teamId: this.matchDetails.participants[0].id,
      playerList: this.getSelectedPlayers(teamOne[0], 0)
    };
    this.teamTwo = {
      teamName: this.matchDetails.participants[1].name,
      teamId: this.matchDetails.participants[1].id,
      playerList: this.getSelectedPlayers(teamTwo[0], 1)
    };
    this.appService.setGameValues(this.teamOne, this.teamTwo);
  }

  getSelectedPlayers(playerList, index) {
    const formattedPlayers: IPlayerList[] = [];
    playerList.map((searchPlayer) => {
      if(this.matchDetails.participants[index].players_involved) {
        let playerFound: boolean = false;
        let playerRole: string = '';
        Object.keys(this.matchDetails.participants[index].players_involved).forEach((keyName) => {
          const existingPlayerList = this.matchDetails.participants[index].players_involved;
          if(existingPlayerList[keyName].jersey_number === searchPlayer.jersey_number) {
            playerFound = true;
            playerRole = existingPlayerList[keyName].playerRole;
          }
        });
        formattedPlayers.push({...searchPlayer, playerSelected: playerFound, playerRole: playerRole});
      } else {
        formattedPlayers.push({...searchPlayer, playerSelected: false});
      }
    });
    return formattedPlayers;
  }

}
