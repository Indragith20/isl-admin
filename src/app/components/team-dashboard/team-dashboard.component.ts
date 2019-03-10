import { Component, OnInit } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { ITeams } from 'src/app/interfaces/team-details.interface';

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
