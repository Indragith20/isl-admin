import { Component, OnInit } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { ITeams } from 'src/app/interfaces/team-details.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  teamDetails: ITeams;
  teamDetailsForm: FormGroup;
  editMode: boolean = false;
  formProperties: string[] = []

  get teamDetailsFormArray() { return (<FormArray>this.teamDetailsForm.get('teamDetailsArray')); }

  constructor(private teamDetailsService: TeamDetailsService, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.teamDetails = this.teamDetailsService.selectedTeam ? this.teamDetailsService.selectedTeam : null;
    this.teamDetailsForm = this.fb.group({
      teamDetailsArray: this.fb.array([])
    });
    if(this.teamDetails) {
      this.createForm();
    }
  }

  createForm() {
    Object.keys(this.teamDetails).map((teamKey) => {
      const newFormGroup = this.fb.group({
        [teamKey]: this.teamDetails[teamKey]
      });
      (this.teamDetailsForm.get('teamDetailsArray') as FormArray).push(newFormGroup);
      this.formProperties.push(teamKey);
    });
    console.log(this.teamDetailsForm);
    console.log(this.formProperties);
  }

  backToTeamDetails() {
    this.router.navigate(['../teams-list'], { relativeTo: this.route });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  updateTeamDetails() {
    console.log(this.teamDetailsFormArray.value);
  }

}
