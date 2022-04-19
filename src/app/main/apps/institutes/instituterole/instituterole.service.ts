import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TblConstant } from 'assets/config/webconfig';

@Injectable({
    providedIn: 'root',
})
export class InstituteroleService {
    /**
     * Constructor
     * @param {AngularFirestore} _angularFire
     */
    constructor(public _angularFire: AngularFirestore) {}

    /**
     * Get Institute of particular uid from firebase collection
     * @param institute_uid : any
     * @returns Obeservable
     */
    getInstituteData(institute_uid: any): Observable<any> {
        return this._angularFire
            .collection(`/${TblConstant.txc_institute_tbl}/`, ref =>
                ref.orderBy('created_at', 'desc'),
            )
            .doc(institute_uid)
            .valueChanges();
    }

    /**
     * Get users list who's user type is not '0' i.e normal user
     * @returns Observable
     */
    getUsersList(): Observable<any> {
        const users = this._angularFire.collection(
            `/${TblConstant.txc_users_tbl}/`,
            ref => {
                return ref
                    .where('user_type', '>', 0)
                    .orderBy('user_type', 'asc');
            },
        );

        return users.valueChanges();
    }

    /**
     * Assign institute role
     * @param role Role array which is assigned to institute
     * @param user_uid The user for which role is assigned
     * @param institute  Institute to whom role has to be assigned
     */
    updateInstituteRole(role, user_uid, institute): Promise<{}> {
        return new Promise((resolve, reject) => {
            const user_role = role.user_type_key;
            const elements = {};
            elements[user_role] = user_uid;
            // console.log(elements);

            this._angularFire
                .collection(`/${TblConstant.txc_institute_tbl}/`)
                .doc(institute.institute_uid)
                .update(elements)
                .then(() => {
                    resolve('Success');
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update institute in user table
     * @param user_uid
     * @param institute
     */
    updateUserInstitute(user_uid, institute, role_type): Promise<{}> {
        const fieldValue = {
            institute_uid: institute.institute_uid,
            uid: '',
            user_role: role_type,
        };
        const user_id = user_uid;

        return new Promise((resolve, reject) => {
            this._angularFire
                .collection(`/${TblConstant.txc_users_tbl}/`)
                .doc(user_id)
                .collection('user_institutes/')
                .add(fieldValue)
                .then((res: any) => {
                    const uniquekey = res._key.path.segments[3];
                    console.log('uniquekey', uniquekey);
                    resolve(this.updateUidKey(uniquekey, user_id));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update institute collection with uid as collection key
     * @param uniquekey
     * @param user_uid
     * @returns Promise
     */
    updateUidKey(uniquekey, user_uid): Promise<{}> {
        return new Promise((resolve, reject) => {
            this._angularFire
                .collection(`/${TblConstant.txc_users_tbl}/`)
                .doc(user_uid)
                .collection('user_institutes/')
                .doc(uniquekey)
                .update({
                    uid: uniquekey,
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
