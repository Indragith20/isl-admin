import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';

@Component({
  selector: 'app-player-number',
  templateUrl: './player-number.component.html',
  styleUrls: ['./player-number.component.css']
})
export class PlayerNumberComponent implements OnInit {
  @Input()
  set playerInField(playerList: IPlayerList[]) {
    if(playerList) {
      this.playerList = playerList;
    }
  }
  @Input() questionId: any;
  @Output() playerSelected = new EventEmitter<any>();
  playerList: any[] = [];
  selectedPlayer: number;
  constructor() { }

  ngOnInit() {}

  selectPlayer(player) {
    this.selectedPlayer = player.jerseyNumber;
    const dataToBePassed = {
      questionId: this.questionId,
      selectedPlayer: player
    };
    this.playerSelected.emit(dataToBePassed);
  }

}
