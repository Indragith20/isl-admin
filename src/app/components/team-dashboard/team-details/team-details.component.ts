import { Component, OnInit } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { ITeams } from 'src/app/interfaces/team-details.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  teamDetails: ITeams;
  editMode: boolean = false;

  constructor(private teamDetailsService: TeamDetailsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamDetails = this.teamDetailsService.selectedTeam ? this.teamDetailsService.selectedTeam : null;
  }

  backToTeamDetails() {
    this.router.navigate(['../teams-list'], {  relativeTo: this.route });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

}
