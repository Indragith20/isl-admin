import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashBoardService {
    constructor(private db:AngularFireDatabase, private http: HttpClient ) { }

    getMatchByDate(date: string) {
        return new Promise((resolve, reject) => {
            const query = this.db.database.ref('matches/matches').orderByChild('start_date').equalTo(date);
            query.on('value', (snapshot) => {
                if(snapshot) {
                    console.log(snapshot.val());
                    resolve(snapshot.val());
                } else {
                    reject('err')
                }
            });
        });
    }
}