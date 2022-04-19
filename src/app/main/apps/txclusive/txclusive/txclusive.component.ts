import { Component, OnInit } from '@angular/core';
import { Constants, GeneralError, GeneralMsg } from 'assets/config/webconfig';
import { TxclusiveData } from '../txclusive.model';
import { TxclusiveService } from './txclusive.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToasterService } from 'app/common/services/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { DetailPopupComponent } from './detail-popup/detail-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-txclusive',
    templateUrl: './txclusive.component.html',
    styleUrls: ['./txclusive.component.scss'],
})
export class TxclusiveComponent implements OnInit {
    pageTitle: string = Constants.const_txclusive_titles.manage_txclusive_view;
    txclusiveViewData: any = [];
    typeArray: any = Constants.const_Txclusive_type;
    levelArray: any = Constants.const_Txclusive_level;
    txclusive_uid: string;
    dateFormate = environment.general_const.dateFormate;
    status: any = [];
    userInfo: any = [];
    private _unsubscribeAll: Subject<any>;
    dialogRef: any;
    reason: string;

    constructor(
        private _txclusiveService: TxclusiveService,
        private _toastrService: ToasterService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.txclusive_uid = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.txclusive_uid !== undefined) {
            this.getTxclusiveData(this.txclusive_uid);
        }

        if (localStorage.getItem('userInfo')) {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            // console.log(this.userInfo);
        }
    }

    /**
     * submit the updated data
     */
    submitForm(): void {
        const params = {
            user_uid: this.userInfo.user_uid,
            txclusive_uid: this.txclusive_uid,
            status: this.txclusiveViewData.status,
            doc_id: '',
            role_id: this.userInfo.user_type,
            updated_at: new Date(),
            reason: this.reason,
        };
        this._txclusiveService.submitForm(params);
    }

    /**
     * Get txclusive data from collection
     * @param userId string : Id of user to get data
     */
    getTxclusiveData(txclusive_uid: string): void {
        this._txclusiveService
            .getTxclusiveList(txclusive_uid)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: TxclusiveData) => {
                    this.txclusiveViewData = data;
                    // console.log(this.txclusiveViewData);
                    if (
                        !(
                            typeof this.txclusiveViewData !== 'undefined' &&
                            this.txclusiveViewData !== null
                        )
                    ) {
                        this._toastrService.error(
                            GeneralError.txclusive_notexist,
                        );
                        setTimeout(() => {
                            this.back();
                        }, 800);
                    }
                },
                error => {
                    this._toastrService.error(error.message);
                },
            );
    }

    /**
     * if the no data in txclusive then redirect txclusive listing page
     */
    back(): void {
        this.router.navigate(['apps/txclusive/txclusivelist']);
    }

    /**
     * get txclusive type name
     */
    getTxclusiveTypeName(type: number | string): string {
        if (type !== '') {
            const typeRecord = this.typeArray.find(
                s => s.value !== '' && Number(s.value) === Number(type),
            );
            return typeRecord.displayValue;
        }
    }

    /**
     * get the txclusive level name
     */
    getTxclusiveLevelName(level: number | string): string {
        if (level !== '') {
            const levelRecord = this.levelArray.find(
                s => s.value !== '' && Number(s.value) === Number(level),
            );
            return levelRecord.displayValue;
        }
    }

    /**
     * open the dialoge and write the disapprove reason for txclusive status
     */
    openDialog(): void {
        if (this.txclusiveViewData.status === 0) {
            this.txclusiveApprove();
        } else if (this.txclusiveViewData.status === 1) {
            this.txclusiveReject();
        }
    }

    /**
     * approve the txclusive status
     */
    txclusiveApprove(): void {
        let successMsg = '';
        this.txclusiveViewData.status = 1;
        this._txclusiveService
            .updateStatus(this.txclusiveViewData)
            .then((data: string) => {
                if (data === 'success') {
                    successMsg = GeneralMsg.txclusive_approve;
                    this._toastrService.success(successMsg);
                    this.router.navigate(['apps/txclusive/txclusivelist']);
                    this.submitForm();
                } else {
                    this._toastrService.error(GeneralError.general_error_msg);
                }
            })
            .catch(err => {
                this._toastrService.error(err.message);
                this.getTxclusiveData(this.txclusive_uid);
            });
    }

    /**
     * disapprove the txclusive status
     */
    txclusiveReject(): void {
        let successMsg = '';
        this.txclusiveViewData.status = 0;
        this.dialogRef = this.dialog.open(DetailPopupComponent, {
            height: 'auto',
            width: '500px',
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.reason = response;
            this._txclusiveService
                .updateStatus(this.txclusiveViewData)
                .then((data: string) => {
                    if (data === 'success') {
                        successMsg = GeneralMsg.txclusive_disapprove;
                        this._toastrService.success(successMsg);
                        this.submitForm();
                        this.router.navigate(['apps/txclusive/txclusivelist']);
                    } else {
                        this._toastrService.error(
                            GeneralError.general_error_msg,
                        );
                    }
                })
                .catch(err => {
                    this._toastrService.error(err.message);
                    this.getTxclusiveData(this.txclusive_uid);
                });
        });
    }
}
