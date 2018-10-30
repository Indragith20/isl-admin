import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { IMatchDetails } from '../interfaces/match-details.interface';
import { IPlayerList } from '../interfaces/player-list.interface';

@Injectable()
export class DashBoardService {
    selectedMatchDetails: IMatchDetails;
    constructor(private db: AngularFireDatabase, private http: HttpClient ) { }

    getMatchByDate(date: string) {
        return new Promise((resolve, reject) => {
            const query = this.db.database.ref('matches/matches').orderByChild('start_date').equalTo(date);
            query.once('value', (snapshot) => {
                if(snapshot) {
                    snapshot.forEach((childSnapshot) => {
                        this.selectedMatchDetails = childSnapshot.val();
                        resolve(childSnapshot.val());
                    });
                } else {
                    reject('err');
                }
            });
        });
    }

    modifyTeamDetails(gameId: string, playerList: IPlayerList[], teamIndex: number) {
        return new Promise((resolve, reject) => {
            this.db.database.ref('matches/matches').orderByChild('game_id').equalTo(gameId).once('value', (snapshot) => {
                if(snapshot) {
                    snapshot.forEach((modSnapShot) => {
                        modSnapShot.ref.child('participants/' + teamIndex + '/players_involved').once('value', (finalSnap) => {
                            finalSnap.ref.set(null);
                            playerList.map((item) => {
                                finalSnap.ref.push(item);
                            });
                            resolve('success');
                        });
                    });
                } else {
                    reject('error');
                }
            });
        });
      }
}
