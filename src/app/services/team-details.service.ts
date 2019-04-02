import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ITeams } from '../interfaces/team-details.interface';
import { IPlayerList } from '../interfaces/player-list.interface';

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
                });
            } else {
                reject('error in getting teams');
            }
        });
    }

    setSelectedTeam(team: ITeams) {
        this.selectedTeam = {...team};
    }

    getLastAddedTeamId() {
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('teams/teamDetails').orderByChild('teamId').limitToLast(1);
            if(ref) {
                ref.on('value', (snapshot) => {
                    console.log(snapshot.val());
                    let lastAddedTeam = {
                        teamId: undefined,
                        teamName: undefined
                    };
                    lastAddedTeam = {...lastAddedTeam , ...Object.values(snapshot.val())[0]};
                    if(lastAddedTeam && lastAddedTeam.teamId) {
                        resolve(lastAddedTeam.teamId);
                    } else {
                        reject('Error');
                    }
                });
            } else {
                reject('Error');
            }
        });
    }

    updateTeamDetails(teamId: string, teamDetails: ITeams): Promise<string> {
        if(Number(teamId) >= 0) {
            return new Promise((resolve, reject) => {
                const ref = this.db.database.ref('teams/teamDetails/').orderByChild('teamId').equalTo(teamId);
                if(ref) {
                    ref.once('value', (snapshot) => {
                        if(snapshot.exists()) {
                            snapshot.forEach((childSnapshot) => {
                                const teamRef = childSnapshot.ref;
                                teamRef.update({...teamDetails}).then((value) => {
                                    resolve('success');
                                }).catch((err) => reject('err'));
                            });
                        } else {
                            const newNode = Number(teamId) - 1;
                            const newRef = this.db.database.ref('teams/teamDetails/' + `${newNode}`);
                            newRef.set({...teamDetails});
                            resolve('success');
                        }
                    });
                } else {
                    reject('Error in Getting Reference');
                }
            });
        } else {
            Promise.reject('Team Id Should be greater than 0');
        }
    }

    getPlayerDetails(teamId: string): Promise<IPlayerList[] | string> {
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('teamDetailsById/' + teamId);
            if(ref) {
                ref.once('value', (snapshot) => {
                    if(snapshot.exists()) {
                        console.log(snapshot.val());
                        const players = snapshot.val() ? snapshot.val().players : [];
                        resolve(players);
                    } else {
                        reject('Error in getting Players');
                    }
                });
            } else {
                reject('Error in getting Players');
            }
        });
    }

    deletePlayer(playerId: number, teamId: string) {
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('teamDetailsById/' + teamId + '/players').orderByChild('player_id').equalTo(playerId);
            ref.once('value', (snapshot) => {
                if(snapshot.exists()) {
                    snapshot.forEach((child) => {
                        child.ref.remove();
                    });
                    resolve('success');
                } else {
                    reject('error');
                }
            });
        });
    }
}
