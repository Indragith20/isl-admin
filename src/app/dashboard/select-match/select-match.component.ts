import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashBoardService } from 'src/app/shared/dashboard.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-match',
  templateUrl: './select-match.component.html',
  styleUrls: ['./select-match.component.css']
})
export class SelectMatchComponent implements OnInit {
  selectedDate: Date;
  showMatch: boolean = false;
  warningMessage: string = 'Please Select the Date';
  matchDetails: any;

  constructor(private datePipe: DatePipe, private dashboardService: DashBoardService,
      private router: Router) { }

  ngOnInit() {
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    this.getMatches();
  }

  getMatches() {
    let searchDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    searchDateString = `${searchDateString}T19:30+05:30`;
    console.log(searchDateString);
    this.dashboardService.getMatchByDate(searchDateString)
      .then((data) => {
        this.showMatch = true;
        this.matchDetails = data;      
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        this.warningMessage = 'Something Bad Happened..Please Try Again'
      });
  }

  showDashboard() {
    this.router.navigate(['dashboard/main-dashboard']);  
  }

}
