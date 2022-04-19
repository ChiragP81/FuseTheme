import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TxclusivelistService {
  institutes: any = [];
  txclusives: any = [];

  constructor(public _angularFire: AngularFirestore) {}

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
      return new Promise((resolve, reject) => {
          Promise.all([
              this.currentTxclusiveList(),
              this.currentInstituteList(),
          ]).then(() => {
              resolve();
          }, reject);
      });
  }

  /**
   * Gets txclusive listing
   * @returns Observable
   */
  getTxclusiveList(): Observable<any> {
      return this._angularFire
          .collection('txclusives', ref => ref.orderBy('created_at', 'desc'))
          .valueChanges();
  }

  /**
   * Gets currenttxclusive listing
   * @returns Observable
   */
  currentTxclusiveList(): any {
      return new Promise((resolve, reject) => {
          this._angularFire
              .collection(`/txclusives/`, ref => {
                  return ref.orderBy('created_at', 'desc');
              })
              .valueChanges()
              .subscribe(querySnapshot => {
                  this.txclusives = querySnapshot;
                  resolve(querySnapshot);
              }, reject);
      });
  }

  /**
   * Gets intitute listing
   * @returns Observable
   */
  currentInstituteList(): any {
      return new Promise((resolve, reject) => {
          this._angularFire
              .collection('institutes')
              .valueChanges()
              .subscribe(querySnapshot => {
                  this.institutes = querySnapshot;
                  resolve(this.institutes);
              }, reject);
      });
  }
}
