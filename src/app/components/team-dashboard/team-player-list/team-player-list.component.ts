import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';
import { TeamAction } from 'src/app/shared/constants/questions';

@Component({
  selector: 'app-team-player-list',
  templateUrl: './team-player-list.component.html',
  styleUrls: ['./team-player-list.component.css']
})
export class TeamPlayerListComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  teamId: string;
  teamName: string;
  playersList: IPlayerList[];
  loading: Observable<boolean>;

  constructor(private teamDetailsService: TeamDetailsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.playersList = [];
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.teamId = params['teamId'];
      this.teamName = params['teamName'];
      this.getPlayers(this.teamId);
    });
    this.loading = this.teamDetailsService.loading;
  }

  getPlayers(teamId: string) {
    this.teamDetailsService.getPlayerDetails(teamId).then((data: IPlayerList[]) => {
      if(data && data.length) {
        data.map((player) => {
          if(player.player_id) {
            this.playersList.push(player);
          }
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  addNewPlayer() {
    this.router.navigate(['../../../player-add-edit/new'],
      { queryParams: { action: TeamAction.ADD_CONSTANTS }, relativeTo: this.route });
  }

  goToPlayerDetails(player: IPlayerList) {
    this.teamDetailsService.setSelectedPlayer(player);
    this.router.navigate(['../../../player-add-edit/' + player.short_name],
      { queryParams: { action: TeamAction.EDIT_CONSTANTS }, relativeTo: this.route });
  }

  deletePlayer(player: IPlayerList) {
    this.teamDetailsService.deletePlayer(player.player_id, this.teamId).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }

  backToTeamDetails() {
    this.router.navigate(['teams-list'], { relativeTo: this.route.parent });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
