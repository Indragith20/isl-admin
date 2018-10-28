import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { ITeamList } from 'src/app/interfaces/team-list.interface';

@Component({
  selector: 'app-line-ups',
  templateUrl: './line-ups.component.html',
  styleUrls: ['./line-ups.component.css']
})
export class LineUpsComponent implements OnInit {
  teamOne: ITeamList;
  teamTwo: ITeamList;

  constructor(private appService: CustomerService) { }

  ngOnInit() {
    this.teamOne = this.appService.teamOne;
    this.teamTwo = this.appService.teamtwo;
  }

}
