import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { ITeamList } from 'src/app/interfaces/team-list.interface';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';
import { PlayerListComponent } from 'src/app/player-list/player-list.component';

@Component({
  selector: 'app-team-two',
  templateUrl: './team-two.component.html',
  styleUrls: ['./team-two.component.css']
})
export class TeamTwoComponent implements OnInit {
  @Input()
  set teamDetails(team: ITeamList) {
    if(team) {
      this.teamList = team;
      this.playerList = team.playerList;
    }
  }
  @Output() teamTwoPlayerList = new EventEmitter<IPlayerList[]>();
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
      const teamTwoList: IPlayerList[] = [...startingLineups, ...substitutes];
      this.teamTwoPlayerList.emit(teamTwoList);
    }
  }

}
