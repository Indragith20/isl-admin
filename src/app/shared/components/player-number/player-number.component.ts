import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';
import { ISelectedQP } from 'src/app/interfaces/select-item.interface';

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
  // TODO: Remove the below input if not needed. This should be done after analysing all the scenarios
  @Input() question: string;
  @Output() playerSelected = new EventEmitter<ISelectedQP>();
  playerList: IPlayerList[] = [];
  selectedPlayer: number;
  constructor() { }

  ngOnInit() {}

  selectPlayer(player: IPlayerList) {
    this.selectedPlayer = player.jersey_number;
    const dataToBePassed: ISelectedQP = {
      question: this.question,
      selectedPlayer: player
    };
    this.playerSelected.emit(dataToBePassed);
  }

}
