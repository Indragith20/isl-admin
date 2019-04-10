import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamDetailsService } from 'src/app/services/team-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { IPlayerList } from 'src/app/interfaces/player-list.interface';
import { TeamAction } from 'src/app/shared/constants/questions';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';

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
  arrayBuffer: any;
  file: File;
  loading: Observable<boolean>;

  constructor(private teamDetailsService: TeamDetailsService, private route: ActivatedRoute, private router: Router,
     private excelService: ExcelService) {
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
        console.log(this.playersList);
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

  downloadSampleExcel() {
    this.teamDetailsService.loadingSource.next(true);
    const sampleData: Partial<IPlayerList>[] = [{
      'full_name': '',
      'short_name': '',
      'is_captain': 0,
      'is_marque': 0,
      'position_id': 0,
      'position_name': '',
      'jersey_number': null,
      'country_id': null,
      'country_name': '',
      'gender': '',
      'jersey_no': null,
      'website': null,
      'facebook': null,
      'twitter': null,
      'google_plus': null,
      'instagram': null
    }];
    this.excelService.exportAsExcelFile(sampleData, 'Players').then((data) => {
      this.teamDetailsService.loadingSource.next(false);
    });
  }

  incomingfile(event) {
    this.file = event.target.files[0];
  }

  upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.formatPlayerData(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  formatPlayerData(playerData: Partial<IPlayerList[]>) {
    const playerIds: string[] =  [];
    const formattedPlayerData: IPlayerList[] = playerData.map((player) => {
      const newPlayerId: string = this.teamDetailsService.getUniqueId();
      playerIds.push(newPlayerId);
      return { ...player, player_id: newPlayerId };
    });
    console.log(formattedPlayerData);
    const promiseResolved = playerIds.reduce((prev, current, index) => {
      return prev.then(() => {
        this.teamDetailsService.updatePlayerDetails(this.teamId, formattedPlayerData[index]);
      }).catch((err) => {
        Promise.reject('err');
      });
    }, Promise.resolve());
    // Possible Error Line.
    promiseResolved.then((updated) => {
      console.log(updated);
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
