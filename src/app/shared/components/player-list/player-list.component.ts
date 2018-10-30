import { Component, OnInit, Input } from '@angular/core';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input() playerList: IPlayerList[];
  @Input() playerRole: string;
  constructor() { }

  ngOnInit() {
  }

  selectPlayer(player: IPlayerList) {
    const modifiedPlayerList = this.playerList.map((currentPlayerDetails: IPlayerList) => {
      if(currentPlayerDetails.player_id === player.player_id) {
        const currentPlayer: IPlayerList = {
          ...currentPlayerDetails,
          playerSelected: !currentPlayerDetails.playerSelected,
        };
        let modifiedPlayer: IPlayerList = {...currentPlayer};
        if(currentPlayer.playerSelected) {
          modifiedPlayer = {...modifiedPlayer, playerRole: this.playerRole };
        }
        return modifiedPlayer;
      }
      return currentPlayerDetails;
    });
    this.playerList = [...modifiedPlayerList];
  }

}
