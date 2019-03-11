import { Component, OnInit } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { ITeams } from 'src/app/interfaces/team-details.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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
    private route: ActivatedRoute, private fb: FormBuilder, public snackBar: MatSnackBar) { }

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
      // Below Condition check is necessary to make the teamID field disabled;
      teamKey === 'teamId' ? newFormGroup.disable() : newFormGroup.enable();
      (this.teamDetailsForm.get('teamDetailsArray') as FormArray).push(newFormGroup);
      this.formProperties.push(teamKey);
    });
  }

  backToTeamDetails() {
    this.router.navigate(['../teams-list'], { relativeTo: this.route });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  updateTeamDetails() {
    console.log(this.teamDetailsFormArray.value);
    let modifiedTeamObj: ITeams = {
      teamId: '',
      teamName: ''
    };
    const updatedTeamDetails = this.teamDetailsFormArray.value;
    updatedTeamDetails.map((teamDet) => {
      modifiedTeamObj = { ...modifiedTeamObj, ...teamDet };
    })
    console.log(modifiedTeamObj);
    this.teamDetailsService.updateTeamDetails(modifiedTeamObj.teamId, modifiedTeamObj).then((data) => {
      console.log(data);
      this.openSnackBar('Update Successfull', 'snackbar-success-style');
    }).catch((err) => {
      console.log(err);
      this.openSnackBar('Not Updated', 'snackbar-error-style')
    })
  }

  openSnackBar(message: string, className: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
