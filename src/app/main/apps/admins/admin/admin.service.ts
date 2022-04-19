import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ToasterService } from '../../../../common/services/toaster.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AdminData } from '../admin.model';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    /**
     * Constructor
     *
     * @param {AngularFirestore} _fireStore
     * @param {ToasterService} toastrService
     * @param {AngularFireStorage} fireStorage
     */
    constructor(
        public _fireStore: AngularFirestore,
        public toastrService: ToasterService,
        public fireStorage: AngularFireStorage,
    ) {}

    /**
     * Get Admin listing from firebase collection
     * @param adminId : any
     * @returns Obeservable
     */
    getAdminList(adminId: string): Observable<any> {
        return this._fireStore
            .collection('users', ref => ref.orderBy('created_at', 'desc'))
            .doc(adminId)
            .valueChanges();
    }

    /**
     * Updates admin data
     * @param admin : AdminData
     * @returns Promise
     */
    updateAdminData(admin: AdminData): Promise<{}> {
        const adminId = admin.user_uid;
        return new Promise((resolve, reject) => {
            admin.status = admin.status;

            this._fireStore
                .collection('users/')
                .doc(adminId)
                .update(admin)
                .then(() => {
                    resolve('success');
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
