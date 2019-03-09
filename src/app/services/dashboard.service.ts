import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMatchDetails, ILiveMatchList } from '../interfaces/match-details.interface';
import { IPlayerList } from '../interfaces/player-list.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DashBoardService {
    selectedMatchDetails: IMatchDetails;
    private scoreLineSource = new BehaviorSubject('');
    scoreLine = this.scoreLineSource.asObservable();
    homeTeamScore: any;
    awayTeamScore: any;

    constructor(private db: AngularFireDatabase, private http: HttpClient) { 
        this.subscribeToMatchScoreLine();
    }

    getMatchByDate(date: string) {
        return new Promise((resolve, reject) => {
            const query = this.db.database.ref('matches/matches').orderByChild('start_date').equalTo(date);
            query.once('value', (snapshot) => {
                if (snapshot) {
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
                if (snapshot) {
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

    startLiveMatch(match: ILiveMatchList) {
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('live');
            if (ref) {
                ref.update({
                    matchId: match.matchId,
                    homeTeamId: match.homeTeamId,
                    homeTeamName: match.homeTeamName,
                    awayTeamId: match.awayTeamId,
                    awayTeamName: match.awayTeamId,
                    homeTeamScore: match.homeTeamScore,
                    awayTeamScore: match.awayTeamScore
                })
                .then((data) => resolve('data'))
                .catch((err) => reject('err'));
            }
        })
    }

    updateHomeTeamScore() {
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('live');
            if (ref) {
                ref.update({
                    homeTeamScore: this.homeTeamScore + 1,
                })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
            }
        })
    }

    updateAwayTeamScore() {
        return new Promise((resolve, reject) => {
            const ref = this.db.database.ref('live');
            if (ref) {
                ref.update({
                    awayTeamScore: this.awayTeamScore + 1,
                })
                .then((data) => resolve('data'))
                .catch((err) => reject('err'));
            }
        })
        
    }

    subscribeToMatchScoreLine() {
        const ref = this.db.database.ref('live');
        ref.on('value', (snapshot) => {
            console.log(snapshot.val());
            const liveMatch: ILiveMatchList = snapshot.val();
            this.homeTeamScore = liveMatch.homeTeamScore;
            this.awayTeamScore = liveMatch.awayTeamScore;
            const scoreLineText: string = `${liveMatch.homeTeamScore} - ${liveMatch.awayTeamScore}`;
            this.scoreLineSource.next(scoreLineText);
        })
    }

    postEventsData(eventsData, gameId) {
        return new Promise((resolve, reject) => {
          this.db.database.ref('matches/matches').orderByChild('game_id').equalTo(gameId).once('value', (snapshot) => {
              snapshot.forEach((modSnapShot) => {
                  modSnapShot.ref.child('event_timeline').once('value', (finalSnap) => {
                      finalSnap.ref.push(eventsData);
                  });
                  modSnapShot.ref.child('event_status').once('value', (snap) => {
                      snap.ref.set('Started');
                  });
              });
              //this.sendNotification('Match Update', notificationString);
              resolve('success');
          }).catch((err) => {
              reject('err');
          });
        });
    }

    sendNotification(title: string, notificationString: string) {
        const body = {
            'notification': {
              'title': title,
              'body': notificationString,
              'sound': 'default',
              'click_action': 'FCM_PLUGIN_ACTIVITY',
              'icon': 'fcm_push_icon'
            },
            'data': {
              'param1': 'value1',
              'param2': 'value2'
            },
              'to': '/topics/all',
              'priority': 'high',
              'restricted_package_name': ''
          };
          const options = new HttpHeaders().set('Content-Type', 'application/json');
          this.http.post('https://fcm.googleapis.com/fcm/send', body, {
            // tslint:disable-next-line:max-line-length
            headers: options.set('Authorization', 'key=AAAALka8P8g:APA91bGxsB0udcit9rSG7y8t2w1L6DSclnP308onGF_aV1S7_aoMTxu1TwfygR-Ezc_jKrLXQ854PbfI_QFd-cmVEyo9q3Ce02-7bNkJwjr8VMBro1XKb5epyBPnuBijixa210IjZiFy'),
          }).subscribe((data) => {
              console.log(data);
          });
      }
}
