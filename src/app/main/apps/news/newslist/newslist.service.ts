import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TblConstant } from 'assets/config/webconfig';
import { orderBy } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class NewslistService {

  /**
   * Constructor
   * @param _angularFire AngularFirestore
   */
  constructor(public _angularFire: AngularFirestore) { }

  /**
   * Gets news listing
   * @returns Observable
   */
  getNewsListing(): Observable<any> {

    return this._angularFire
      .collection(TblConstant.news_tbl, ref => ref.orderBy('created_at', 'desc'))
      .valueChanges();

  }
}
