import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InstitutelistService {
    /**
     * Constructor
     * @param {AngularFirestore} _angularFire
     */
    constructor(public _angularFire: AngularFirestore) {}

    /**
     * Gets intitute listing
     * @returns Observable
     */
    getIntituteList(): Observable<any> {
        return this._angularFire
            .collection('institutes', ref => ref.orderBy('created_at', 'desc'))
            .valueChanges();
    }
}
