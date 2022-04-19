import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TblConstant } from 'assets/config/webconfig';

@Injectable({
    providedIn: 'root'
})
export class TriviaService {

    /**
     * Constructor
     * @param _angularFire 
     */
    constructor(
        public _angularFire: AngularFirestore
    ) { }

    /**
     * Add new entry in trivia table
     * @param inputParam Data to be added
     * @returns Promise
     */
    addNewTrivia(inputParam): Promise<{}> {

        return new Promise((resolve, reject) => {

            this._angularFire
                .collection(`${TblConstant.trivia_tbl}`)
                .add(inputParam)
                .then((res: any) => {
                    let uniquekey = res._key.path.segments[1];
                    resolve(this.updateUidKey(uniquekey));
                }).catch(error => {
                    reject(error);
                });

        })

    }

    /**
     * Update trivia collection with trivia_uid as collection key while creating new trivia
     * @param uniquekey Last generated key id
     * @returns Promise
     */
    updateUidKey(uniquekey): Promise<{}> {

        return new Promise((resolve, reject) => {

            // console.log('generate key')
            this._angularFire
                .collection(`${TblConstant.trivia_tbl}`)
                .doc(uniquekey)
                .update({
                    trivia_uid: uniquekey
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
