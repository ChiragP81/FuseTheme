import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class DashboardService implements Resolve<any> {
    projects: any[];
    widgets: any[];
    users: any;
    admins: any;
    institutes: any;
    news: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        public angularfire: AngularFirestore,
        private _httpClient: HttpClient,
    ) {}

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
                this.getUsers(),
                this.getAdmins(),
                this.getInstitutes(),
                this.getNews(),
                this.getProjects(),
                this.getWidgets(),
            ]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get users
     *
     * @returns {Promise<any>}
     */
    getUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.angularfire
                .collection('users')
                .get()
                .subscribe(querySnapshot => {
                    this.users = querySnapshot.size;
                    resolve(this.users);
                }, reject);
        });
    }

    /**
     * Get admins
     *
     * @returns {Promise<any>}
     */
    getAdmins(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.angularfire
                .collection(`/users/`, ref => {
                    return ref
                        .where('user_type', '==', 9)
                        .orderBy('created_at', 'desc');
                })
                .get()
                .subscribe(querySnapshot => {
                    this.admins = querySnapshot.size;
                    resolve(this.admins);
                }, reject);
        });
    }

    /**
     * Get institutes
     *
     * @returns {Promise<any>}
     */
    getInstitutes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.angularfire
                .collection('institutes')
                .get()
                .subscribe(querySnapshot => {
                    this.institutes = querySnapshot.size;
                    resolve(this.institutes);
                }, reject);
        });
    }

    /**
     * Get news
     *
     * @returns {Promise<any>}
     */
    getNews(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.angularfire
                .collection('news')
                .get()
                .subscribe(querySnapshot => {
                    this.news = querySnapshot.size;
                    resolve(this.news);
                }, reject);
        });
    }

    /**
     * Get projects
     *
     * @returns {Promise<any>}
     */
    getProjects(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get('api/project-dashboard-projects')
                .subscribe((response: any) => {
                    this.projects = response;
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get('api/project-dashboard-widgets')
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }
}
