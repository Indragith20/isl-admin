import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ITeams } from '../interfaces/team-details.interface';
import { IPlayerList } from '../interfaces/player-list.interface';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { firestore } from 'firebase/app';

@Injectable()
export class TeamDetailsService {
    selectedTeam: ITeams;
    selectedPlayer: IPlayerList;
    loadingSource = new BehaviorSubject(false);
    loading = this.loadingSource.asObservable();

    constructor(private db: AngularFireDatabase, private snackBar: MatSnackBar) {}

    getTeams() {
        this.loadingSource.next(true);
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('teams/teamDetails');
            if(ref) {
                ref.once('value', (snapshot) => {
                    const teams = snapshot.val();
                    this.loadingSource.next(false);
                    resolve(teams);
                });
            } else {
                this.loadingSource.next(false);
                reject('error in getting teams');
            }
        });
    }

    setSelectedTeam(team: ITeams) {
        this.selectedTeam = {...team};
    }

    setSelectedPlayer(player: IPlayerList) {
        this.selectedPlayer = player;
    }

    getLastAddedTeamId() {
        this.loadingSource.next(true);
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
                        this.loadingSource.next(false);
                        resolve(lastAddedTeam.teamId);
                    } else {
                        this.loadingSource.next(false);
                        reject('Error');
                    }
                });
            } else {
                this.loadingSource.next(false);
                reject('Error');
            }
        });
    }

    updateTeamDetails(teamId: string, teamDetails: ITeams): Promise<string> {
        this.loadingSource.next(true);
        if(Number(teamId) >= 0) {
            return new Promise((resolve, reject) => {
                const ref = this.db.database.ref('teams/teamDetails/').orderByChild('teamId').equalTo(teamId);
                if(ref) {
                    ref.once('value', (snapshot) => {
                        if(snapshot.exists()) {
                            snapshot.forEach((childSnapshot) => {
                                const teamRef = childSnapshot.ref;
                                teamRef.update({...teamDetails}).then((value) => {
                                    this.loadingSource.next(false);
                                    resolve('success');
                                }).catch((err) => {
                                    this.loadingSource.next(false);
                                    reject('err');
                                });
                            });
                        } else {
                            const newNode = Number(teamId) - 1;
                            const newRef = this.db.database.ref('teams/teamDetails/' + `${newNode}`);
                            newRef.set({...teamDetails});
                            resolve('success');
                            this.loadingSource.next(false);
                        }
                    });
                } else {
                    this.loadingSource.next(false);
                    reject('Error in Getting Reference');
                }
            });
        } else {
            this.loadingSource.next(false);
            Promise.reject('Team Id Should be greater than 0');
        }
    }

    getPlayerDetails(teamId: string): Promise<IPlayerList[] | string> {
        this.loadingSource.next(true);
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('teamDetailsById/' + teamId);
            if(ref) {
                ref.once('value', (snapshot) => {
                    if(snapshot.exists()) {
                        console.log(snapshot.val());
                        let resolvedPlayers = [];
                        if(snapshot.val()) {
                            const players = snapshot.val().players;
                            if(Array.isArray(players)) {
                                resolvedPlayers = [...players];
                            } else {
                                resolvedPlayers = this.mapObjectToArray(players);
                            }
                        }
                        this.loadingSource.next(false);
                        resolve(resolvedPlayers);
                    } else {
                        this.loadingSource.next(false);
                        reject('Error in getting Players');
                    }
                });
            } else {
                this.loadingSource.next(false);
                reject('Error in getting Players');
            }
        });
    }

    updatePlayerDetails(teamId: string, playerDetails: IPlayerList) {
        this.loadingSource.next(true);
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('teamDetailsById/' + teamId + '/players')
                            .orderByChild('player_id').equalTo(playerDetails.player_id);
            if(ref) {
                ref.once('value', (snapshot) => {
                    if(snapshot.exists()) {
                        snapshot.forEach((childSnapshot) => {
                            const playerRef = childSnapshot.ref;
                            playerRef.update({...playerDetails}).then((value) => {
                                this.loadingSource.next(false);
                                resolve('success');
                            }).catch((err) => {
                                this.loadingSource.next(false);
                                reject('err');
                            });
                        });
                    } else {
                        const newNode = playerDetails.player_id;
                        const newRef = this.db.database.ref('teamDetailsById/' + teamId + '/players/' + `${newNode}`);
                        newRef.set({...playerDetails});
                        this.loadingSource.next(false);
                        resolve('success');
                    }
                });
            } else {
                this.loadingSource.next(false);
                reject('Error in Getting Reference');
            }
        })
    }

    deletePlayer(playerId: number, teamId: string) {
        this.loadingSource.next(true);
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('teamDetailsById/' + teamId + '/players').orderByChild('player_id').equalTo(playerId);
            ref.once('value', (snapshot) => {
                if(snapshot.exists()) {
                    snapshot.forEach((child) => {
                        child.ref.remove();
                    });
                    this.loadingSource.next(false);
                    resolve('success');
                } else {
                    this.loadingSource.next(false);
                    reject('error');
                }
            });
        });
    }

    openSnackBar(message: string, className: string, action?: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
          panelClass: [className],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
    }

    mapObjectToArray(playerObjects) {
        const arrayToBeReturned = [];
        Object.keys(playerObjects).map((uniqueKey) => {
            arrayToBeReturned.push(playerObjects[uniqueKey]);
        });
        return arrayToBeReturned;
    }

    getUniqueId(): string {
        const ts = firestore.Timestamp;
        const uniqueId = ts.now().toMillis() + '_' + Math.random().toString(36).substr(2, 9);
        return uniqueId;
    }
}
