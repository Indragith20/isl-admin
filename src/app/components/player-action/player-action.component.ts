import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormArray } from '@angular/forms';
import { IPlayerList } from '../../interfaces/player-list.interface';


export interface DialogData {
    title: string;
    modalContent: FormGroup;
    selectedTeamId: string;
    selectedTeamPlayers: IPlayerList[];
}

@Component({
  selector: 'app-player-action',
  templateUrl: './player-action.component.html',
  styleUrls: ['./player-action.component.css']
})
export class PlayerActionComponent {

  modalContent: FormGroup;
  modalTitle: string;
  selectedTeamPlayerInField: IPlayerList[];
  selectedTeamPlayer: any[] = [];
  
  player: any;
  
  get modalFormData() {
    return <FormArray>this.modalContent.get('questions');
  }

  constructor(public dialogRef: MatDialogRef<PlayerActionComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.modalContent = data.modalContent;
    this.modalTitle = data.title;
    // this.selectedTeamPlayerInField = data.selectedTeamPlayers.filter(player => player.is_substitute === false);
    this.selectedTeamPlayerInField = data.selectedTeamPlayers;
    
  }

  onUpdateClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  changeSelectedPlayer(playerDet: any) {
    console.log(playerDet);
  }

  /* submit() {
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
  } */

}
