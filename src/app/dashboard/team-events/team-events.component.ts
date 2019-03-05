import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';
import { MatDialog } from '@angular/material';
import { PlayerActionComponent } from 'src/app/player-action/player-action.component';

@Component({
  selector: 'app-team-events',
  templateUrl: './team-events.component.html',
  styleUrls: ['./team-events.component.css']
})
export class TeamEventsComponent implements OnInit {
  @Input()
  set cardDetails(value: any) {
    if(value) {
      this.cards = value;
      this.intializeFormValues();
    }
  }
  @Input() players: IPlayerList[];
  @Input() teamId: string;
  @Input() teamName: string;
  modalContent: FormGroup;

  get formData() { return <FormArray>this.cardForms.get('cards'); }

  get modalFormData() { return <FormArray>this.modalContent.get('questions'); }

  cardForms: FormGroup;
  cards: any;
  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.cardForms = this.fb.group({
      team: ['1'],
      cards: new FormArray([])
    });
   }

  ngOnInit() {
  }

  intializeFormValues() {
    this.cards.map((card) => {
      const questionFormArray = new FormArray([]);
      card.questions.map((question) => {
        const questionFormGroup = this.fb.group({
          questionId: [question.questionId],
          question: [question.question],
          formType: [question.type],
          currentTeam: [question.currentTeam]
        });
        questionFormArray.push(questionFormGroup);
      });

      const newFormGroup = this.fb.group({
        clicked: false,
        title: card.title,
        icon: card.icon,
        isTwoTeamsInvolved: card.isTwoTeamsInvolved,
        questions: questionFormArray
      });

      (this.cardForms.get('cards') as FormArray).push(newFormGroup);
    });
  }
  
  openDialog(card): void {
    const dialogRef = this.dialog.open(PlayerActionComponent, {
      data: {
        title: card.get('title').value,
        modalContent: card,
        selectedTeamId: this.teamId,
        selectedTeamPlayers: this.players,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // this.createStatsData(dialogRef.componentInstance);
        console.log(result);
      }
    });
  }
}
