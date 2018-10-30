import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { ITeamList } from 'src/app/interfaces/team-list.interface';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';
import { PlayerListComponent } from 'src/app/shared/components/player-list/player-list.component';


@Component({
  selector: 'app-team-one',
  templateUrl: './team-one.component.html',
  styleUrls: ['./team-one.component.css']
})
export class TeamOneComponent implements OnInit {
  @Input()
  set teamDetails(team: ITeamList) {
    if(team) {
      this.teamList = team;
      this.playerList = team.playerList;
    }
  }
  @Output() teamOnePlayerList = new EventEmitter<IPlayerList[]>();
  @ViewChild('starting') startPlayerList: PlayerListComponent;
  @ViewChild('subs') subsPlayerList: PlayerListComponent;
  teamList: ITeamList;
  playerList: IPlayerList[];

  constructor() { }

  ngOnInit() {
  }

  submitTeam() {
    if(this.startPlayerList && this.subsPlayerList) {
      const startingLineups = this.startPlayerList.playerList.filter((player) => {
        if(player.playerSelected && player.playerRole === 'starting') {
          return player;
        }
      });
      const substitutes = this.subsPlayerList.playerList.filter((player) => {
        if(player.playerSelected && player.playerRole === 'subs') {
          return player;
        }
      });
      const teamOneList: IPlayerList[] = [...startingLineups, ...substitutes];
      this.teamOnePlayerList.emit(teamOneList);
    }
  }
}
