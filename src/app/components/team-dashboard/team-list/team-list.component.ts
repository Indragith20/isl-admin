import { Component, OnInit } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { ITeams } from 'src/app/interfaces/team-details.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamAction } from 'src/app/shared/constants/questions';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: ITeams[] = [];
  loading: boolean = true;

  constructor(private teamDetailsService: TeamDetailsService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamDetailsService.getTeams().then((teams: ITeams[]) => {
      this.loading = false;
      this.teams = teams;
    }).catch((err) => {
      console.log(err);
    })
  }

  goToTeamDetails(team: ITeams) {
    this.teamDetailsService.setSelectedTeam(team);
    this.router.navigate(['../teams-details'], { queryParams: { action: TeamAction.EDIT_CONSTANTS }, relativeTo: this.route });
  }

  addNewTeam() {
    this.router.navigate(['../teams-details'], { queryParams: { action: TeamAction.ADD_CONSTANTS }, relativeTo: this.route });
  }

}
