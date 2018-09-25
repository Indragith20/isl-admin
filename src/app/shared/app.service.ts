import { Injectable } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument
} from 'angularfire2/firestore';

@Injectable()
export class AppService {
    autheticated: boolean = false;

    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router) { }


    emailLogin(email: string, password: string) {
        return this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then(credential => {
                this.autheticated = true;
                return credential; // if using firestore
            })
            .catch(error => console.log(error));
    }

}