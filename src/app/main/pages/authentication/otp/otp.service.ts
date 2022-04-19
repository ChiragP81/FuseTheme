import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class OTPService {
    constructor(private firestore: AngularFirestore) {}

    userHandler(user_uid): any {
        return this.firestore
            .collection('/users/', ref => ref.where('user_uid', '==', user_uid))
            .valueChanges();
    }

    onVerification(verificationId, verificationCode): any {
        const signInCredential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
        );
        console.log('signInCredential', signInCredential);
    }
}
