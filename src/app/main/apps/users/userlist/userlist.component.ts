import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { ToasterService } from '../../../../common/services/toaster.service';
import { MetaService } from '../../../../common/services/meta.service';
import { Subject } from 'rxjs';
import { MetaConstant } from 'assets/config/meta';
import { Constants, Status } from 'assets/config/webconfig';
import { UserlistService } from './userlist.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';
import { environment } from 'environments/environment';
import { User } from '../user.model';


@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit, OnDestroy, AfterViewInit {
    // Private
    private _unsubscribeAll: Subject<any>;

    public pageTitle: string = Constants.const_user_titles.manage_user_list;
    public dateFormate = environment.general_const.dateFormate;
    public userData: User[] = [];
    userInfo: User[] = [];
    state: State = {
        skip: 0,
        take: Constants.pagination,
    };
    approve_status = Constants.approve_status;
    approvestatusdata: any = [];
    statusArray: Status[] = Constants.status;
    status: any = [];

    /**
     * Constructor
     * @param {ToasterService} _toastrService
     * @param {MetaService} _metaService
     * @param {UserlistService} _userService
     * @param {Router} router
     */
    constructor(
        private _toastrService: ToasterService,
        private _metaService: MetaService,
        private _userService: UserlistService,
        private router: Router,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._metaService.updateTitle(MetaConstant.UserList.title);
        this._metaService.updateMetaInfo(
            MetaConstant.UserList.description,
            MetaConstant.UserList.author,
            MetaConstant.UserList.keywords,
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
     * After View init
     */
    ngAfterViewInit(): void {
        this.getGridData();
    }
    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    viewByFilter(filterValue: number | string): void {
        // approve_status
        if (filterValue === '') {
            this.userInfo = this.approvestatusdata;
        } else {
            this.userInfo = this.approvestatusdata.filter(
                data => data.is_verified === filterValue,
            );
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get User Grid List Data
     */
    getGridData(): void {
        this._userService
            .getUserList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: User[]) => {
                    this.userInfo = data;
                    this.status = data;
                    this.approvestatusdata = data;
                },
                error => {
                    this._toastrService.error(error.message);
                },
            );
    }

    /**
     * Edit Column Kendo Grid Event Handler
     * @param user_uid String
     */
    editHandler(user_uid: string): void {
        const viewId = user_uid;
        this.router.navigate(['/apps/users/user/' + viewId]);
    }

    /**
     * Get status display value as per status value
     * @param status
     */
    getStatusName(status: string | number): string {
        if (status !== '') {
            const statusRecord = this.statusArray.find(
                s => s.value !== null && Number(s.value) === Number(status),
            );
            return statusRecord.displayValue;
        } else {
            return 'Inactive';
        }
    }
}
