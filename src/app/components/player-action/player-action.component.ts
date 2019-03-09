import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormArray } from '@angular/forms';
import { IPlayerList, IEventTeamDetails } from '../../interfaces/player-list.interface';
import { ISelectedQP } from 'src/app/interfaces/select-item.interface';


export interface DialogData {
    title: string;
    modalContent: FormGroup;
    selectedTeam: IEventTeamDetails;
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
  selectedOptions: ISelectedQP = null;
  teamDetails: IEventTeamDetails;
  
  player: any;
  
  get modalFormData() {
    return <FormArray>this.modalContent.get('questions');
  }

  constructor(public dialogRef: MatDialogRef<PlayerActionComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data);
    this.modalContent = data.modalContent;
    this.modalTitle = data.title;
    this.teamDetails = data.selectedTeam;
    this.selectedTeamPlayerInField = data.selectedTeamPlayers;
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }


  changeSelectedPlayer(selectedDetails: ISelectedQP) {
    this.selectedOptions = selectedDetails;
  }

  onUpdateClick() {
    let newEvent = {};
    if(this.selectedOptions && this.selectedOptions.question && this.selectedOptions.selectedPlayer) {
      newEvent = {
        eventName: this.modalTitle,
        playerDetails: {
          playerId: this.selectedOptions.selectedPlayer.player_id,
          playerName: this.selectedOptions.selectedPlayer.full_name,
          jerseyNumber: this.selectedOptions.selectedPlayer.jersey_number
        },
        teamDetails: this.teamDetails
      };
    }
    this.dialogRef.close(newEvent);
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
