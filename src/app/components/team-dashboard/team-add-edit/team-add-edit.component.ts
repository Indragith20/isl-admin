import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { ITeams } from 'src/app/interfaces/team-details.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { TeamAction } from 'src/app/shared/constants/questions';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-add-edit.component.html',
  styleUrls: ['./team-add-edit.component.css']
})
export class TeamAddEditComponent implements OnInit, OnDestroy {
  teamDetails: ITeams;
  teamDetailsForm: FormGroup;
  editMode: boolean = false;
  paramSubscription: Subscription;
  formProperties: string[] = [];
  loading: boolean = true;
  arrayBuffer: any;
  file: File;

  get teamDetailsFormArray() { return (<FormArray>this.teamDetailsForm.get('teamDetailsArray')); }

  constructor(private teamDetailsService: TeamDetailsService, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder, public snackBar: MatSnackBar,
    private excelService: ExcelService) {
      this.paramSubscription = this.route.queryParams.subscribe((params) => {
        this.performAction(params['action']);
      })
  }

  ngOnInit() {}

  performAction(action: string) {
    this.teamDetailsForm = this.fb.group({
      teamDetailsArray: this.fb.array([])
    });
    if(action === TeamAction.ADD_CONSTANTS) {
      this.teamDetailsService.getLastAddedTeamId().then((data) => {
        this.createNewTeam(+data);
      });
    } else if(action === TeamAction.EDIT_CONSTANTS) {
      this.teamDetails = this.teamDetailsService.selectedTeam ? this.teamDetailsService.selectedTeam : null;
      if(this.teamDetails) {
        this.createForm();
      } else {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  createNewTeam(lastAddedTeamID: number) {
    const newTeamId = String(lastAddedTeamID + 1);
    const newTeamArrayConstants = ['color', 'fanBase', 'fanClub', 'headCoach', 'highlights',
                                  'homeVenue', 'icon', 'profile', 'rivals', 'shortName', 'teamId', 'teamName',  'twitterAccount'];
    newTeamArrayConstants.map((teamKey) => {
      const newFormGroup = this.fb.group({
        [teamKey]: teamKey === 'teamId' ? this.fb.control({value: newTeamId, disabled: true}) : ''
      });
      (this.teamDetailsForm.get('teamDetailsArray') as FormArray).push(newFormGroup);
    });
    this.formProperties = [...newTeamArrayConstants];
    this.editMode = true;
    this.loading = false;
  }

  createForm() {
    Object.keys(this.teamDetails).map((teamKey) => {
      const newFormGroup = this.fb.group({
        [teamKey]: this.teamDetails[teamKey]
      });
      // Below Condition check is necessary to make the teamID field disabled
      teamKey === 'teamId' ? newFormGroup.disable() : newFormGroup.enable();
      (this.teamDetailsForm.get('teamDetailsArray') as FormArray).push(newFormGroup);
      this.formProperties.push(teamKey);
    });
    this.loading = false;
  }

  backToTeamDetails() {
    this.router.navigate(['../teams-list'], { relativeTo: this.route });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  updateTeamDetails() {
    let modifiedTeamObj: ITeams = {
      teamId: '',
      teamName: ''
    };
    const updatedTeamDetails = this.teamDetailsFormArray.getRawValue();
    updatedTeamDetails.map((teamDet) => {
      modifiedTeamObj = { ...modifiedTeamObj, ...teamDet };
    });
    console.log(modifiedTeamObj);
    this.teamDetailsService.updateTeamDetails(modifiedTeamObj.teamId, modifiedTeamObj).then((data) => {
      this.openSnackBar('Update Successfull', 'snackbar-success-style');
    }).catch((err) => {
      this.openSnackBar('Not Updated', 'snackbar-error-style');
    });
  }

  openSnackBar(message: string, className: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  downloadSampleExcel() {
    this.loading = true;
    const sampleData: Partial<ITeams>[] = [{
      color: '',
      fanBase: '',
      fanClub: '',
      headCoach: '',
      highlights: '',
      homeVenue: '',
      icon: '',
      profile: '',
      rivals: '',
      shortName: '',
      teamName: '',
      twitterAccount: '',
    }];
    this.excelService.exportAsExcelFile(sampleData, 'Teams').then((data) => {
      this.loading = false;
    });
  }

  incomingfile(event) {
    this.file = event.target.files[0];
  }

  upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.formatTeamData(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  formatTeamData(teamData: Partial<ITeams[]>) {
    this.teamDetailsService.getLastAddedTeamId().then((data) => {
      let lastAddedTeamID = +data;
      const teamIds: number[] =  [];
      const formattedTeam: ITeams[] = teamData.map((team) => {
        lastAddedTeamID = lastAddedTeamID + 1;
        teamIds.push(lastAddedTeamID);
        return { ...team, teamId: String(lastAddedTeamID) };
      });
      console.log(formattedTeam);
      const promiseResolved = teamIds.reduce((prev, current, index) => {
        return prev.then(() => {
          this.teamDetailsService.updateTeamDetails(String(current), formattedTeam[index]);
        }).catch((err) => {
          Promise.reject('err');
        });
      }, Promise.resolve());
      // Possible Error Line.
      promiseResolved.then((updated) => {
        console.log(updated);
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
