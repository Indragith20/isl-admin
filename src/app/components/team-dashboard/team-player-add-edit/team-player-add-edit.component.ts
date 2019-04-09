import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamAction } from 'src/app/shared/constants/questions';
import { ITeams } from 'src/app/interfaces/team-details.interface';
import { firestore } from 'firebase/app';


@Component({
  selector: 'app-team-player-add-edit',
  templateUrl: './team-player-add-edit.component.html',
  styleUrls: ['./team-player-add-edit.component.css']
})
export class TeamPlayerAddEditComponent implements OnInit, OnDestroy {
  player: IPlayerList;
  selectedTeam: ITeams;
  playerDetailsForm: FormGroup;
  formProperties: string[] = [];
  loading: boolean = false;
  editMode: boolean = false;
  paramSubscription: Subscription;

  constructor(private teamDetailsService: TeamDetailsService, private route: ActivatedRoute,
     private fb: FormBuilder, public snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) {
      this.paramSubscription = this.route.queryParams.subscribe((params) => {
        this.performAction(params['action']);
      });
  }

  ngOnInit() {
  }

  performAction(action: string) {
    this.selectedTeam = this.teamDetailsService.selectedTeam ? this.teamDetailsService.selectedTeam : null;
    this.playerDetailsForm = this.fb.group({});
    if(action === TeamAction.ADD_CONSTANTS) {
      this.createNewPlayer();
    } else if(action === TeamAction.EDIT_CONSTANTS) {
      this.player = this.teamDetailsService.selectedPlayer ? this.teamDetailsService.selectedPlayer : null;
      if(this.player) {
        this.createForm();
      } else {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  createNewPlayer() {
    const ts = firestore.Timestamp;
    const uniqueId = ts.now().toMillis() + '_' + Math.random().toString(36).substr(2, 9);
    const newPlayerId = uniqueId;
    const newTeamArrayConstants = ['player_id',
      'full_name',
      'short_name',
      'is_captain',
      'is_marque',
      'position_id',
      'position_name',
      'jersey_number',
      'country_id',
      'country_name',
      'gender',
      'jersey_no',
      'website',
      'facebook',
      'twitter',
      'google_plus',
      'instagram',
    ];
    newTeamArrayConstants.map((playerKey) => {
      this.playerDetailsForm.addControl(playerKey, new FormControl(''));
      if (playerKey === 'player_id' || playerKey === 'Country_id' || playerKey === 'Position_id') {
        this.playerDetailsForm.get(playerKey).setValue(newPlayerId);
        this.playerDetailsForm.get(playerKey).disable();
      }
      this.formProperties.push(playerKey);
    });
    console.log(this.playerDetailsForm);
    this.editMode = true;
    this.loading = false;
  }

  createForm() {
    Object.keys(this.player).map((playerKey) => {
      this.playerDetailsForm.addControl(playerKey, new FormControl(this.player[playerKey]));
      if(playerKey === 'player_id' || playerKey === 'Country_id' || playerKey === 'Position_id') {
        this.playerDetailsForm.get(playerKey).disable();
      }
      this.formProperties.push(playerKey);
    });
    console.log(this.playerDetailsForm);
  }

  updatePlayerDetails() {
    this.loading = true;
    const modifiedPlayerDetails: IPlayerList = this.playerDetailsForm.getRawValue();
    this.teamDetailsService.updatePlayerDetails(this.selectedTeam.teamId, modifiedPlayerDetails).then((data) => {
        this.loading = false;
        this.teamDetailsService.openSnackBar('Update Successfull', 'snackbar-success-style');
      }).catch((err) => {
        this.loading = false;
        this.teamDetailsService.openSnackBar('Not Updated', 'snackbar-error-style');
      });
  }

  backToPlayerDetails() {
    this.router.navigate(['../../player-list/' + this.selectedTeam.teamId + '/' + this.selectedTeam.shortName], { relativeTo: this.route });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
