import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  statsData: any[] = [];
  teamOne: string = '';
  teamTwo: string = '';
  gameId: string;

  constructor(private activatedRoute: ActivatedRoute, private appService: CustomerService) { 
    /* this.activatedRoute.params.subscribe((data) => {
      console.log(data);
      this.gameId = data.id;
      console.log(this.appService.teamOne);
      console.log(this.appService.teamtwo);
      this.teamOne = this.appService.teamOne ? this.appService.teamOne : 'teamOne';
      this.teamTwo = this.appService.teamtwo ? this.appService.teamtwo : 'teamTwo';
    });
    this.formStats(); */
  }

  ngOnInit() {
  }

  formStats() {
    this.statsData = [{
      stats: 'Possession',
      [this.teamOne]: '',
      [this.teamTwo]: ''
    },{
      stats: 'Goals',
      [this.teamOne]: '',
      [this.teamTwo]: ''
    },{
      stats: 'Pass Accuracy',
      [this.teamOne]: '',
      [this.teamTwo]: ''
    },{
      stats: 'Offsides',
      [this.teamOne]: '',
      [this.teamTwo]: ''
    },{
      stats: 'Shots on Target',
      [this.teamOne]: '',
      [this.teamTwo]: ''
    },{
      stats: 'Fouls',
      [this.teamOne]: '',
      [this.teamTwo]: ''
    }, {
      stats: 'Corners',
      [this.teamOne]: '',
      [this.teamTwo]: ''
    }, {
      stats: 'Red Cards',
      [this.teamOne]: '',
      [this.teamTwo]: ''
    }, {
      stats: 'Yellow Cards',
      [this.teamOne]: '',
      [this.teamTwo]: ''
    }]
  }

  submitStats() {
    console.log(this.statsData);
    this.appService.submitStatsData(this.gameId, this.statsData, `${this.teamOne}-${this.teamTwo}`);
  }

}
