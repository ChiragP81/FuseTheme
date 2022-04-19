import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { AdminlistService } from './adminlist.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MetaService } from '../../../../common/services/meta.service';
import { MetaConstant } from '../../../../../assets/config/meta';
import { Constants, Status } from 'assets/config/webconfig';
import { State } from '@progress/kendo-data-query';
import { AdminData } from '../admin.model';

@Component({
    selector: 'app-adminlist',
    templateUrl: './adminlist.component.html',
    styleUrls: ['./adminlist.component.scss'],
})
export class AdminlistComponent implements OnInit, OnDestroy, AfterViewInit {
    // Private default
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    adminGridData: AdminData[] = [];
    pageTitle: string = Constants.const_admin_titles.manage_admin_list;
    state: State = {
        skip: 0,
        take: Constants.pagination,
    };
    statusArray: Status[] = Constants.admin_status;
    status:  AdminData[] = [];

    /**
     * Constructor
     *
     * @param {AdminlistService} adminService
     * @param {Router} router
     * @param {MetaService} _metaService
     */
    constructor(
        private adminService: AdminlistService,
        private router: Router,
        private _metaService: MetaService,
    ) {
        this._metaService.updateTitle(MetaConstant.AdminList.title);
        this._metaService.updateMetaInfo(
            MetaConstant.AdminList.description,
            MetaConstant.AdminList.author,
            MetaConstant.AdminList.keywords,
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    /**
     * After View Init
     */
    ngAfterViewInit(): void {
        this.adminService
            .getAdminList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: AdminData[]) => {
                data.filter(
                    admin =>
                        (admin.fullName =
                            admin.first_name + ' ' + admin.last_name),
                );
                this.adminGridData = data;
                this.status = data;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Edit Column Kendo Grid Event Handler
     * @param user_uid
     * @returns Navigagests to Admin listing
     */
    editHandler(user_uid: string): void {
        const editId = user_uid;
        this.router.navigate(['/apps/admins/admin/' + editId]);
    }

    viewByFilter(filterValue: number): void {
        if (filterValue === null) {
            this.adminGridData = this.status;
        } else {
            this.adminGridData = this.status.filter(
                data => data.status === filterValue,
            );
        }
    }

    /**
     * Get status display value as per status value
     * @param status
     */
    getStatusName(status: string | number): string {
        if (status !== '') {
            const statusRecord = this.statusArray.find(
                s => Number(s.value) === Number(status),
            );
            return statusRecord.displayValue;
        } else {
            return 'Inactive';
        }
    }

    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
