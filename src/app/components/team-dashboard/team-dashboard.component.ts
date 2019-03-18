import { Component, OnInit } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css'],
  providers: [TeamDetailsService]
})
export class TeamDashboardComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
