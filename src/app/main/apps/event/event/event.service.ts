import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EventData } from '../event.model';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    userInfo: any;

    constructor(public _angularFire: AngularFirestore) {}

    submitForm(params: any): any {
        return new Promise((resolve, reject) => {
            this._angularFire
                .collection('events') 
                .doc(params.event_uid)
                .collection('verify_by')
                .add(params)
                .then((res: any) => {
                    const uniquekey = res._key.path.segments[3];
                    resolve(this.updateUidKey(uniquekey, params.event_uid));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    updateUidKey(uniquekey, event_uid): Promise<{}> {
        return new Promise((resolve, reject) => {
            this._angularFire
                .collection('events')
                .doc(event_uid)
                .collection('verify_by')
                .doc(uniquekey)
                .update({
                    doc_id: uniquekey,
                })
                .then(() => {
                    resolve('Success');
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    updateStatus(event: EventData): any {
        return new Promise((resolve, reject) => {
            this._angularFire
                .collection('events')
                .doc(event.event_uid)
                .update({
                    status: event.status,
                })
                .then(() => {
                    resolve('Success');
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Gets event listing
     * @returns Observable
     */
    getEventList(eventId: string): Observable<any> {
        return this._angularFire
            .collection('events')
            .doc(eventId)
            .valueChanges();
    }
}
