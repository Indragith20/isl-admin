import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  teamOne: string = '';
  teamTwo: string = '';
  gameId: string;
  selectedEvent: string;
  selectedTeam: string;
  selectedPlayer: string;
  events: any[] = [];
  teams: any[] = [];
  players: any[] = [];
  participants: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private appService: CustomerService) {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data);
      this.gameId = data.id;
      console.log(this.appService.teamOne);
      console.log(this.appService.teamtwo);
      this.appService.getStartingLineup(this.gameId).then((data) => {
        console.log(data);
        this.getPlayersList(data);
      }).catch((err) => {
        console.log(err)
      });
      this.teamOne = this.appService.teamOne ? this.appService.teamOne : 'teamOne';
      this.teamTwo = this.appService.teamtwo ? this.appService.teamtwo : 'teamTwo';
    });
    this.selectedEvent = 'Select Event';
    this.selectedTeam = 'Select Team';
    this.selectedPlayer = 'Select Player'
    this.events = [{
      label: 'Match Started',
      value: 'Match Started'
    }, {
      label: 'Goals',
      value: 'Goals'
    }, {
      label: 'Red Card',
      value: 'Red Card'
    }, {
      label: 'Yellow Card',
      value: 'Yellow Card'
    }, {
      label: 'Penalty Kick',
      value: 'Penalty Kick'
    }, {
      label: 'Free Kick',
      value: 'Free Kick'
    }, {
      label: 'Match Ended',
      value: 'Match Ended'
    }];
    this.teams = [{
      label: this.teamOne,
      value: this.teamOne
    }, {
      label: this.teamTwo,
      value: this.teamTwo
    }];
    this.players = [];
  }

  ngOnInit() {
  }

  updateEvent(event) {
    this.selectedEvent = event;
  }

  getPlayersList(matchData) {
    matchData.map((match) => {
      this.participants = [...match.participants];
    });
    console.log(this.participants);
  }

  updateTeam(team) {
    this.selectedTeam = team;
    const identifiedTeam = this.participants.filter(teamDet => teamDet.name === team);
    identifiedTeam.map((teams) => {
        if(teams.players_invloved) {
          Object.keys(teams.players_invloved).map((playerList: any) => {
            const player  = {
              label: playerList.playerName,
              value: playerList
            };
            this.players.push(player);
          });
        }
    });
  }

  updatePlayer(player) {
    this.selectedPlayer = player;
  }

}
