import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TblConstant } from 'assets/config/webconfig';
import { News } from '../news.model';


@Injectable({
    providedIn: 'root'
})
export class NewsmanageService {
    /**
     * Constructor
     * @param {AngularFirestore} _angularFire
     */
    constructor(public _angularFire: AngularFirestore) {}

    /**
     * Get institute listing
     */
    getInstitutes(): Observable<any> {
        return this._angularFire
            .collection(`${TblConstant.txc_institute_tbl}`)
            .valueChanges();
    }

    /**
     * Get users listing
     */
    getUsers(): Observable<any> {
        const users = this._angularFire.collection(
            `/${TblConstant.txc_users_tbl}/`,
            ref => {
                return ref
                    .where('status', '==', '1')
                    .orderBy('created_at', 'asc');
            }
        );

        return users.valueChanges();
    }

    /**
     * Add / Update news data
     * @param inputParam
     * @returns Promise
     */
    addUpdateNews(inputParam: News): Promise<{}> {
        return new Promise((resolve, reject) => {
            if (inputParam.news_uid === undefined || inputParam.news_uid === '') {
                // console.log('create');
                this._angularFire
                    .collection(`${TblConstant.news_tbl}`)
                    .add(inputParam)
                    .then((res: any) => {
                        const uniquekey = res._key.path.segments[1];
                        resolve(this.updateUidKey(uniquekey));
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                // console.log('update')
                this._angularFire
                    .collection(`${TblConstant.news_tbl}`)
                    .doc(inputParam.news_uid)
                    .update(inputParam)
                    .then(() => {
                        resolve('Success');
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        });
    }

    /**
     * Update news collection with news_uid as collection key while creating news
     * @param uniquekey Last generated unique key
     * @returns Promise
     */
    updateUidKey(uniquekey): Promise<{}> {
        return new Promise((resolve, reject) => {
            // console.log('generate key')
            this._angularFire
                .collection(`${TblConstant.news_tbl}`)
                .doc(uniquekey)
                .update({
                    news_uid: uniquekey
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
     * Gets single news data of news_uid
     * @param news_uid
     */
    getNewsData(news_uid): Observable<any> {
        return this._angularFire
            .collection(`/${TblConstant.news_tbl}/`, ref =>
                ref.orderBy('created_at', 'desc')
            )
            .doc(news_uid)
            .valueChanges();
    }
}
