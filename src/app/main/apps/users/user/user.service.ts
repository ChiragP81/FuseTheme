import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TblConstant } from 'assets/config/webconfig';
import { User } from '../user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    /**
     * Constructor
     *
     * @param {AngularFirestore} _fireStore
     */
    useris_verified = true;
    constructor(private _fireStore: AngularFirestore) {}

    /**
     * Return user listing from collection
     * @param userId Id of user to get data
     */
    getUserList(userId: string): Observable<any> {
        return this._fireStore
            .collection('users')
            .doc(userId)
            .valueChanges();
    }

    /**
     * Update user institute request status
     * @param user Data of user which has to be updated
     */
    updateInstitue(user: User, useris_verified: any) {
        return new Promise((resolve, reject) => {
            user.is_verified = useris_verified;
            this._fireStore
                .collection(`/${TblConstant.txc_users_tbl}/`)
                .doc(user.user_uid)
                .update({
                    institutes: user.institutes,
                    is_verified: user.is_verified,
                })
                .then(() => {
                    resolve('Success');
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
