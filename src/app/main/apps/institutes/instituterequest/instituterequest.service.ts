import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TblConstant } from 'assets/config/webconfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstituterequestService {

  /**
   * Constructor
   * @param _angularFire 
   */
  constructor(
    public _angularFire: AngularFirestore
  ) { }

  /**
   * Gets institute request listing 
   * & its status as '1' i.e. not yet approved
   * @returns Observable
   */
  getIntituteRequest(): Observable<any> {

    return this._angularFire
      .collection(`${TblConstant.institute_request_tbl}`
        // , ref => ref
        //   .where('status', '==', 1)
        //   .orderBy('cityOfInstitute', 'asc')
      )
      .snapshotChanges();

  }

  /**
   * Approve institute request by updating `status` as 0 ,i.e. approved
   * @param requestId Id reference of data
   * @returns Promise
   */
  approveInstituteRequest(requestId: string ): Promise<{}> {

    return new Promise((resolve, reject) => {

      this._angularFire
        .collection(`${TblConstant.institute_request_tbl}`)
        .doc(requestId)
        .update({
          status: 0
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
