import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashBoardService } from 'src/app/shared/dashboard.service';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-select-match',
  templateUrl: './select-match.component.html',
  styleUrls: ['./select-match.component.css']
})
export class SelectMatchComponent implements OnInit {
  selectedDate: Date;
  constructor(private datePipe: DatePipe, private dashboardService: DashBoardService) { }

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
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
