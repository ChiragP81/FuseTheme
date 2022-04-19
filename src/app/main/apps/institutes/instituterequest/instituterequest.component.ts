import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
} from '@angular/core';
import { MetaService } from 'app/common/services/meta.service';
import { MetaConstant } from 'assets/config/meta';
import { Constants, GeneralError, GeneralMsg } from 'assets/config/webconfig';
import { Subject } from 'rxjs';
import { State, process } from '@progress/kendo-data-query';
import {
    GridDataResult,
    DataStateChangeEvent,
} from '@progress/kendo-angular-grid';
import { InstituterequestService } from './instituterequest.service';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from 'app/common/services/toaster.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from './approve-confirmation-dialog/approve-conformation-dialog.component';
import { InstituteRequest } from '../institue.model';

@Component({
    selector: 'app-instituterequest',
    templateUrl: './instituterequest.component.html',
    styleUrls: ['./instituterequest.component.scss'],
})
export class InstituterequestComponent
    implements OnInit, OnDestroy, AfterViewInit {
    private _unSubcribeServices: Subject<any>;

    // Component variables
    public pageTitle: string =
        Constants.const_institute_titles.manage_institute_request;
    public instituteRequestData: InstituteRequest[] = [];
    public gridData: GridDataResult;
    public state: State = {
        take: Constants.pagination,
        skip: 0,
    };
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    /**
     * Constructor
     * @param {MetaService} _metaService Service to update meta tags and title
     * @param {InstituterequestService} _instituteRequestService Service to access institute request data
     * @param {ToasterService} _toastrService Service to display toastr messages
     * @param {MatDialog} dialog Service to open Material modal dialog.
     */
    constructor(
        private _metaService: MetaService,
        private _instituteRequestService: InstituterequestService,
        private _toastrService: ToasterService,
        private dialog: MatDialog,
    ) {
        this._unSubcribeServices = new Subject();

        // Update meta tags
        this._metaService.updateTitle(MetaConstant.InstituteRequest.title);
        this._metaService.updateMetaInfo(
            MetaConstant.InstituteRequest.description,
            MetaConstant.InstituteRequest.author,
            MetaConstant.InstituteRequest.keywords,
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit(): void {}

    /**
     * After View Init
     */
    ngAfterViewInit(): void {
        this.getListing();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Gets institute request listing
     */
    getListing(): void {
        this._instituteRequestService
            .getIntituteRequest()
            .pipe(takeUntil(this._unSubcribeServices))
            .subscribe(
                result => {
                    if (result) {
                        console.log('resultresult', result);
                        this.instituteRequestData = result.map((res: any) => {
                            const data = res.payload.doc.data();
                            const _id = res.payload.doc.id;
                            return { _id, ...data };
                        });
                    }
                    // console.log('request data', this.instituteRequestData);
                },
                (error: any) => {
                    console.log(error);
                    this._toastrService.error(GeneralError.general_error_msg);
                },
            );

        this.gridData = process(this.instituteRequestData, this.state);
    }

    /**
     * Grid data state change event
     * @param state `DataStateChangeEvent`
     */
    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.instituteRequestData, this.state);
    }

    /**
     * Approve institute's request
     * @param data
     */
    approveRequest(data: InstituteRequest): any {
        // console.log(data);
        if (
            Number(this.userInfo.user_type) !== Constants.super_admin_user_type
        ) {
            this._toastrService.error(GeneralError.no_permission);
            return false;
        }

        if (data !== undefined && data !== null) {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent);
            dialogRef.afterClosed().subscribe((cnfApprove: boolean) => {
                // console.log('cnfApprove', cnfApprove);
                if (cnfApprove) {
                    this._instituteRequestService
                        .approveInstituteRequest(data._id)
                        .then((res: string) => {
                            if (res === 'Success') {
                                console.log('approved !');
                                this._toastrService.success(
                                    GeneralMsg.institute_approve,
                                );
                                this.getListing();
                            } else {
                                this._toastrService.error(
                                    GeneralError.general_error_msg,
                                );
                            }
                        })
                        .catch(() => {
                            this._toastrService.error(
                                GeneralError.general_error_msg,
                            );
                        });
                }
            });
        }
    }

    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe with subscriptions
        this._unSubcribeServices.next();
        this._unSubcribeServices.complete();
    }
}

