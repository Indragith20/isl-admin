import { Component, OnInit, Input } from '@angular/core';
import { IPlayerList } from '../interfaces/player-list.interface';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input() playerList: IPlayerList[];

  constructor() { }

  ngOnInit() {
  }

}
