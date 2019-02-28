import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

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
  @Input() teamId: string;
  modalContent: FormGroup;

  get formData() { return <FormArray>this.cardForms.get('cards'); }

  get modalFormData() { return <FormArray>this.modalContent.get('questions'); }

  cardForms: FormGroup;
  cards: any;
  constructor(private fb: FormBuilder) {
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
    console.log(card);
  }
}
