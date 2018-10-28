import { Component, OnInit, Input } from '@angular/core';
import { ITeamList } from 'src/app/interfaces/team-list.interface';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';

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
  teamList: ITeamList;
  playerList: IPlayerList[];

  constructor() { }

  ngOnInit() {
  }

}
