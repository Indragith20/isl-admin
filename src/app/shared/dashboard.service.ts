import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashBoardService {
    selectedMatchDetails: any;
    constructor(private db:AngularFireDatabase, private http: HttpClient ) { }

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
                    reject('err')
                }
            });
        });
    }
}