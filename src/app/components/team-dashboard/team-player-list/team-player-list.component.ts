import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';

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

  constructor(private teamDetailsService: TeamDetailsService, private route: ActivatedRoute) {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.teamId = params['teamId'];
      this.teamName = params['teamName'];
      this.getPlayers(this.teamId);
    });
  }

  ngOnInit() {
    this.playersList = [];
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

  goToPlayerDetails(player: IPlayerList) {

  }

  deletePlayer(player: IPlayerList) {
    this.teamDetailsService.deletePlayer(player.player_id, this.teamId).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
