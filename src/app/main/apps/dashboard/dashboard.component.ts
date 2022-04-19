import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';

import { DashboardService } from './dashboard.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Constants } from '../../../../assets/config/webconfig';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class DashboardComponent implements OnInit {
    userInfo: any;
    isSuperAdmin = false;
    projects: any[];
    selectedProject: any;

    users: any;
    admins: any;
    institutes: any;
    news: any;

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};

    dateNow = Date.now();

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {DashboardService} _dashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _dashboardService: DashboardService,
    ) {
        /**
         * Widget 5
         */
        this.widget5 = {
            currentRange: 'TW',
            xAxis: true,
            yAxis: true,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA'],
            },
            onSelect: ev => {
                console.log(ev);
            },
            supporting: {
                currentRange: '',
                xAxis: false,
                yAxis: false,
                gradient: false,
                legend: false,
                showXAxisLabel: false,
                xAxisLabel: 'Days',
                showYAxisLabel: false,
                yAxisLabel: 'Isues',
                scheme: {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA'],
                },
                curve: shape.curveBasis,
            },
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange: 'TW',
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: true,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63'],
            },
            onSelect: ev => {
                console.log(ev);
            },
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T',
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: false,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107'],
            },
            onSelect: ev => {
                console.log(ev);
            },
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange: 'TW',
            xAxis: false,
            yAxis: false,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA'],
            },
            curve: shape.curveBasis,
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        if (localStorage.getItem('userInfo')) {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (
                Number(this.userInfo.user_type) ===
                Constants.super_admin_user_type
            ) {
                this.isSuperAdmin = true;
            }
        }

        this.projects = this._dashboardService.projects;
        this.selectedProject = this.projects[0];
        this.widgets = this._dashboardService.widgets;

        this.users = this._dashboardService.users;
        this.admins = this._dashboardService.admins;
        this.institutes = this._dashboardService.institutes;
        this.news = this._dashboardService.news;

        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}

export class FilesDataSource extends DataSource<any> {
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {}
}
