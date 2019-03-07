import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITeamList } from '../interfaces/team-list.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase: AngularFireDatabase, private http: HttpClient ) { }

  customerList: AngularFireList<any>;
  matchList: AngularFireList<any>;
  teamOne: ITeamList;
  teamtwo: ITeamList;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    date_created: new FormControl(''),
    image_url: new FormControl(''),
    source_link: new FormControl(''),
    team_id: new FormControl(''),
    team_name: new FormControl(''),
    title: new FormControl('')
  });

  getCustomers() {
    this.customerList = this.firebase.list('news/news');
    return this.customerList.snapshotChanges();
  }

  insertCustomer(customer) {
    this.customerList.push({
      date_created: customer.date_created,
      image_url: customer.image_url,
      source_link: customer.source_link,
      team_id: customer.team_id,
      team_name: customer.team_name,
      title: customer.title
    });
  }

  updateCustomer(customer) {
    this.customerList.update(customer.$key, {
      date_created: customer.date_created,
      image_url: customer.image_url,
      source_link: customer.source_link,
      team_id: customer.team_id,
      team_name: customer.team_name,
      title: customer.title
    });
  }

  deleteCustomer(customer) {
    this.customerList.remove(customer.$key);
  }
  populateForm(customer) {
    this.form.setValue(customer);
  }

  getMatches() {
    return new Promise((resolve, reject) => {
        this.firebase.database.ref('matches/matches').orderByChild('start_date')
            .on('value', (snapshot) => {
                if(snapshot) {
                    let resolveArray = [];
                    const value = snapshot.val();
                    if(value === null) {
                        resolveArray = null;
                    } else if(value !== null && value.length) {
                        resolveArray = [...value];
                    } else {
                        Object.keys(value).map((key) => {
                            resolveArray.push(value[key]);
                        });
                    }
                    resolve(resolveArray);
                } else {
                    console.log('err');
                    reject('err');
                }
            });
    });
  }

  getPlayerDetails(teamId): Observable<{}[]> {
    let localTeamId = '';
    switch(teamId) {
        case '499':
            localTeamId = '1';
          break;
        case '656':
            localTeamId = '2';
            break;
        case '505':
            localTeamId = '3';
            break;
        case '500':
            localTeamId = '4';
            break;
        case '496':
            localTeamId = '5';
            break;
        case '501':
            localTeamId = '6';
            break;
        case '1159':
            localTeamId = '7';
            break;
        case '498':
            localTeamId = '8';
            break;
        case '506':
            localTeamId = '9';
            break;
        case '504':
            localTeamId = '10';
            break;
        default:
            break;
    }
    return this.firebase.list('teamDetailsById/' + localTeamId).valueChanges();
  }

  setGameValues(teamOne, teamTwo) {
    this.teamOne = teamOne;
    this.teamtwo = teamTwo;
  }

  submitStatsData(gameId: string, statsData: any) {
      return new Promise((resolve, reject) => {
        this.firebase.database.ref('matches/matches').orderByChild('game_id').equalTo(gameId).once('value', (snapshot) => {
            if(snapshot) {
                snapshot.forEach((modSnapShot) => {
                    modSnapShot.ref.child('post_stats').once('value', (finalSnap) => {
                       finalSnap.ref.set(null);
                        statsData.map((item) => {
                            finalSnap.ref.push(item);
                        });
                        resolve('success');
                    });
                });
            } else {
                reject('err');
            }
        });
      });
  }

  getStartingLineup(gameId: string) {
      return new Promise((resolve, reject) => {
        this.firebase.database.ref('matches/matches').orderByChild('game_id').equalTo(gameId).once('value', (snapshot) => {
            if(snapshot) {
                resolve(snapshot.val());
            } else {
                reject('No Teams Found');
            }
        });
      });
  }
}
