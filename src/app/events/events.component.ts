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
  identifiedTeamDetails: any;
  selectedPlayer: string;
  events: any[] = [];
  teams: any[] = [];
  players: any[] = [];
  participants: any[] = [];
  scoreLine: any;
  time: any;
  showLoader: boolean = false;

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
      value: 'Goal'
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
    if(matchData.length) {
      matchData.map((match) => {
        this.participants = [...match.participants];
      });
    } else {
      Object.keys(matchData).map((match) => {
        this.participants = [...matchData[match].participants];
      });
    }
    
    console.log(this.participants);
  }

  updateTeam(team) {
    this.selectedTeam = team;
    const identifiedTeam = this.participants.filter(teamDet => teamDet.name === team);
    this.identifiedTeamDetails = identifiedTeam[0];
    identifiedTeam.map((teams) => {
        if(teams.players_involved) {
          Object.keys(teams.players_involved).map((playerListKey: any) => {
            const player  = {
              label: teams.players_involved[playerListKey].playerName,
              value: teams.players_involved[playerListKey]
            };
            this.players.push(player);
          });
        }
    });
  }

  updatePlayer(player) {
    this.selectedPlayer = player;
  }

  submit() {
    this.showLoader = true;
    const newEvent = {
      eventName: this.selectedEvent,
      teamDetails: this.identifiedTeamDetails,
      playerDetails: this.selectedPlayer,
      scoreline: this.scoreLine,
      time: this.time
    };
    const notificationString = this.getNotificationString();
    this.appService.postEventsData(newEvent, notificationString, this.gameId)
      .then((data) => {
        this.showLoader = false;
        console.log(data);
      }).catch((err) => {
        console.log(err);
        this.showLoader = false;
      });
  }

  getNotificationString() {
    const returnString = `${this.teamOne} ${this.scoreLine} ${this.teamTwo}`;
    return returnString;
  }

}
