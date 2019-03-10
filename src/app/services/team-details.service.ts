import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ITeams } from '../interfaces/team-details.interface';

@Injectable()
export class TeamDetailsService {
    selectedTeam: ITeams;
    constructor(private db: AngularFireDatabase) {}

    getTeams() {
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('teams/teamDetails');
            if(ref) {
                ref.once('value', (snapshot) => {
                    const teams = snapshot.val();
                    resolve(teams);
                })
            } else {
                reject('error in getting teams')
            }
        })
    }

    setSelectedTeam(team: ITeams) {
        this.selectedTeam = {...team};
    }
}