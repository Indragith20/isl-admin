import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { DatePipe } from '@angular/common';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-lineups',
  templateUrl: './lineups.component.html',
  styleUrls: ['./lineups.component.css']
})
export class LineupsComponent implements OnInit {
  matchDetailsArray: any[] = [];
  matchSelection: boolean = true;
  selectedMatch: any;
  teamOneDetails: any;
  teamTwoDetails: any;
  teamOnePlayerSelected: any;
  teaTwoPlayerSelected: any;

  constructor(private appService: CustomerService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches() {
    this.matchDetailsArray = [];
    this.appService.getMatches().then((matchData: any) => {
      this.matchDetailsArray = matchData.filter(matches => matches.event_status === 'Yet to begin')
        .map((selectedMatches) => {
          return {
            date: this.datePipe.transform(selectedMatches.start_date, 'MM/dd/yyyy'),
            matchParticipants: this.getMatchParticipants(selectedMatches.participants),
            matchId: selectedMatches.game_id
          }
        });
    });
  }

  getMatchParticipants(participants: any) {
    let modifiedList = [];
    modifiedList = participants.map((team) => {
      return {
        teamName: team.name,
        teamId: team.id
      };
    });
    return modifiedList;
  }

  selectMatch(match) {
    this.matchSelection = false;
    this.teamOneDetails = {};
    this.teamTwoDetails = {};
    this.appService.getPlayerDetails(match.matchParticipants[0].teamId).subscribe((players: any) => {
      this.teamOneDetails = {
        teamOneName: match.matchParticipants[0].teamName,
        teamOneId: match.matchParticipants[0].teamId,
        playerList: players[0].map(player => ({ ...player, playerSelected: false }))
      }
    });
    this.appService.getPlayerDetails(match.matchParticipants[1].teamId).subscribe((players: any) => {
      this.teamTwoDetails = {
        teamTwoName: match.matchParticipants[1].teamName,
        teamTwoId: match.matchParticipants[1].teamId,
        playerList: players[0].map(player => ({ ...player, playerSelected: false }))
      }
    });
    this.selectedMatch = match;
  }

  backToMatch() {
    this.matchSelection = true;
  }

  selectTeamTwoPlayer(players) {
    const playerList = this.teamTwoDetails.playerList.map((player) => {
      if (player.player_id === players.player_id) {
        return { ...player, playerSelected: !player.playerSelected }
      }
      return player;
    });
    this.teamTwoDetails.playerList = [...playerList];
  }

  selectTeamOnePlayer(players) {
    const playerList = this.teamOneDetails.playerList.map((player) => {
      if (player.player_id === players.player_id) {
        return { ...player, playerSelected: !player.playerSelected }
      }
      return player;
    });
    this.teamOneDetails.playerList = [...playerList];
  }

  submitPlayerList() {
    const teamOnePlayerSelectedList = this.teamOneDetails.playerList.filter(player => player.playerSelected === true)
      .map((modPlayers) => {
        return {
          playerName: modPlayers.full_name,
          role: 'starting',
          jerseyNumber: modPlayers.jersey_number
        };
      });
    const teamTwoPlayerSelectedList = this.teamTwoDetails.playerList.filter(player => player.playerSelected === true)
      .map((modPlayers) => {
        return {
          playerName: modPlayers.full_name,
          role: 'starting',
          jerseyNumber: modPlayers.jersey_number
        };
      });
    if (teamOnePlayerSelectedList.length === 11 && teamTwoPlayerSelectedList.length === 11) {
        this.appService.modifyMatchDetails(this.selectedMatch.matchId, teamOnePlayerSelectedList, teamTwoPlayerSelectedList);
    } else {
      alert('please select 11 players');
    }
  }

}
