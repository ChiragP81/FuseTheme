import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
    constructor(private firestore: AngularFirestore) {}

    getCountry(): any {
        return this.firestore
            .collection('/countries/', ref => ref.orderBy('name', 'asc'))
            .valueChanges();
    }

    login(phoneNumber, recaptchaVerifier): any {
        return new Promise((resolve: any, reject: any) => {
            firebase
                .auth()
                .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
                .then(credential => {
                    return resolve(credential.verificationId);
                })
                .catch(error => {
                    return reject(error);
                });
        });
    }
}
