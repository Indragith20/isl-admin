import { Injectable } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class AppService {
    autheticated: boolean = false;
    token: string;

    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private firebaseApp: FirebaseApp) { }


    emailLogin(email: string, password: string) {
        return this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then(credential => {
                console.log(credential);
                this.autheticated = true;
                return credential; // if using firestore
            })
            .catch(error => console.log(error));
    }

    getToken() {
       this.afAuth.idToken.subscribe((data) => {
           console.log(data);
           this.token = data;
       });
    }

    sendMessage() {
        
    }

}