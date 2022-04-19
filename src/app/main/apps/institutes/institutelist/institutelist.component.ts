import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MetaService } from 'app/common/services/meta.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Constants, Status } from 'assets/config/webconfig';
import { MetaConstant } from 'assets/config/meta';
import { InstitutelistService } from './institutelist.service';
import { takeUntil } from 'rxjs/operators';
import { State } from '@progress/kendo-data-query';
import { ToasterService } from 'app/common/services/toaster.service';
import { Institute} from '../institue.model';



@Component({
    selector: 'app-institutelist',
    templateUrl: './institutelist.component.html',
    styleUrls: ['./institutelist.component.scss'],
})
export class InstitutelistComponent
    implements OnInit, AfterViewInit, OnDestroy {
    // Private
    private _unsubscribeAll: Subject<any>;

    public pageTitle: String =
        Constants.const_institute_titles.manage_institute_list;
    instituteListData: Institute[] = [];
    state: State = {
        skip: 0,
        take: Constants.pagination,
    };
    statusArray: Status[] = Constants.institute_status;
    status: Institute[] = [];

    /**
     * Constructor
     * @param {MetaService} _metaService Provides meta tag services
     * @param {Router} router Provides the navigation and url manipulation capabilities
     * @param {InstitutelistService} _instituteService Provides access to intitute component
     * @param {ToasterService} _toastrService Provides material toastr
     */
    constructor(
        private _metaService: MetaService,
        private router: Router,
        private _instituteService: InstitutelistService,
        private _toastrService: ToasterService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._metaService.updateTitle(MetaConstant.InstituteList.title);
        this._metaService.updateMetaInfo(
            MetaConstant.InstituteList.description,
            MetaConstant.InstituteList.author,
            MetaConstant.InstituteList.keywords,
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
        // Get institute from firestore
        this._instituteService
            .getIntituteList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: Institute[]) => {
                    this.instituteListData = data;
                    // console.log(this.instituteListData);
                    this.status = data;
                },
                (error: any) => {
                    this._toastrService.error(error.message);
                },
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Edit institute
     * @param uid Institute uid
     */
    edit(uid): void {
        this.router.navigate([`/apps/institutes/${uid}/edit`]);
    }

    /**
     * Redirect to add institute page
     */
    addNewInstitute(): void {
        this.router.navigate(['/apps/institutes/institute']);
    }

    /**
     * Assign role to institutes
     * @param uid Institute uid
     */
    assignRole(uid): void {
        this.router.navigate([`/apps/institutes/${uid}/instituterole`]);
    }

    viewByFilter(filterValue: number): void {
        if (filterValue === null) {
            this.instituteListData = this.status;
        } else {
            this.instituteListData = this.status.filter(
                data => data.status === filterValue,
            );
        }
    }

    /**
     * Get status display value as per status value
     * @param status
     */
    getStatusName(status: string): String {
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
        //  Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
