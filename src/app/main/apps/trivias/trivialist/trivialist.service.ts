import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TblConstant } from 'assets/config/webconfig';

@Injectable({
  providedIn: 'root'
})
export class TrivialistService {

    /**
     * Constructor
     * @param _angularFireStore 
     */
  constructor(
    public _angularFireStore : AngularFirestore
  ) { }

  /**
   * Get trivia listing
   * @returns Observable
   */
  getTrivias() : Observable<any>{

    return this._angularFireStore
                .collection(TblConstant.trivia_tbl , ref  => ref.orderBy('created_at', 'desc'))
                .valueChanges();

  }
}
