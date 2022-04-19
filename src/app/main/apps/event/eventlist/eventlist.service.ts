import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class EventlistService {
    institutes: any = [];
    events: any = [];

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
                this.currentEventList(),
                this.currentInstituteList(),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Gets event listing
     * @returns Observable
     */
    getEventList(): Observable<any> {
        return this._angularFire
            .collection('events', ref => ref.orderBy('created_at', 'desc'))
            .valueChanges();
    }

    /**
     * Gets currentevent listing
     * @returns Observable
     */
    currentEventList(): any {
        return new Promise((resolve, reject) => {
            this._angularFire
                .collection(`/events/`, ref => {
                    return ref.orderBy('created_at', 'desc');
                })
                .valueChanges()
                .subscribe(querySnapshot => {
                    this.events = querySnapshot;
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
