import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css'],
  providers: [TeamDetailsService]
})
export class TeamDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  dialogRef: MatDialogRef<any>;
  loadingSubscription: Subscription;
  constructor(private teamDetailsService: TeamDetailsService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadingSubscription = this.teamDetailsService.loading.subscribe((data: boolean) => {
      console.log(data);
      if(data) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    });
  }

  openDialog() {
    if(!this.dialogRef) {
      setTimeout(() => {
        this.dialogRef = this.dialog.open(LoadingSpinnerComponent);
      });
    }
  }

  closeDialog() {
    if(this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
