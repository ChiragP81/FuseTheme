import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TblConstant } from 'assets/config/webconfig';

@Injectable({
    providedIn: 'root',
})
export class UserlistService {
    /**
     * Constructor
     *
     * @param {AngularFirestore} _fireStore
     */
    constructor(private _fireStore: AngularFirestore) {}

    /**
     * Return user listing from collection
     */
    getUserList(): Observable<any> {
        let users = this._fireStore.collection(
            `/${TblConstant.txc_users_tbl}/`,
            ref => {
                return ref
                    .where('status', '==', 1);
                    // .orderBy('created_at', 'desc');
            },
        );
        return users.valueChanges();

        // return this._fireStore
        //     .collection(`${TblConstant.txc_users_tbl}`, ref =>
        //         ref.orderBy('created_at', 'desc'),
        //     )
        //     .valueChanges();
    }
}
