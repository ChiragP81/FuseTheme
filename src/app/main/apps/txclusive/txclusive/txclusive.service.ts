import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TxclusiveData } from '../txclusive.model';

@Injectable({
    providedIn: 'root',
})
export class TxclusiveService {
    constructor(public _angularFire: AngularFirestore) {}

    /**
     * Gets TXCLUSIVE listing
     * @returns Observable
     */
    getTxclusiveList(txclusiveId: string): Observable<any> {
        return this._angularFire
            .collection('txclusives')
            .doc(txclusiveId)
            .valueChanges();
    }

    /**
     * add the field in txclusive collection
     * @param {*} params
     * @returns {*}
     * @memberof TxclusiveService
     */
    submitForm(params: any): any {
        return new Promise((resolve, reject) => {
            this._angularFire
                .collection('txclusives')
                .doc(params.txclusive_uid)
                .collection('verify_by')
                .add(params)
                .then((res: any) => {
                    const uniquekey = res._key.path.segments[3];
                    resolve(this.updateUidKey(uniquekey, params.txclusive_uid));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * @param {*} uniquekey
     * @param {*} txclusive_uid
     * @returns {Promise<{}>}
     * @memberof TxclusiveService
     */
    updateUidKey(uniquekey, txclusive_uid): Promise<{}> {
        return new Promise((resolve, reject) => {
            this._angularFire
                .collection('txclusives')
                .doc(txclusive_uid)
                .collection('verify_by')
                .doc(uniquekey)
                .update({
                    doc_id: uniquekey,
                })
                .then(() => {
                    resolve('success');
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     *update the status
     * @param {TxclusiveData} txcluisve
     * @returns {*}
     * @memberof TxclusiveService
     */
    updateStatus(txcluisve: TxclusiveData): any {
        return new Promise((resolve, reject) => {
            this._angularFire
                .collection('txclusives')
                .doc(txcluisve.txclusive_uid)
                .update({
                    status: txcluisve.status,
                })
                .then(() => {
                    resolve('success');
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
