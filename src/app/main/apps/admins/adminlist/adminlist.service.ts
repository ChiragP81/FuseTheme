import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminlistService {
    /**
     * Constructor
     *
     * @param {AngularFirestore} _fireStore
     */
    constructor(public _fireStore: AngularFirestore) {}

    /**
     * Get Admin data service
     * @returns Observable
     */
    getAdminList(): Observable<any> {
        const users = this._fireStore.collection(`/users/`, ref => {
            return ref.where('user_type', '==', 9).orderBy('created_at', 'desc');
        });
        return users.valueChanges();
    }
}
