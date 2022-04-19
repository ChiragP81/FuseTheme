import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'environments/environment';
import { TxclusivelistService } from './txclusivelist.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { State } from '@progress/kendo-data-query';
import { Constants } from 'assets/config/webconfig';
import { Router } from '@angular/router';
import { Txclusive } from '../txclusive.model';

@Component({
    selector: 'app-txclusivelist',
    templateUrl: './txclusivelist.component.html',
    styleUrls: ['./txclusivelist.component.scss'],
})
export class TxclusivelistComponent implements OnInit, AfterViewInit {
    private _unsubscribeAll: Subject<any>;
    statusArray: any = Constants.txclusive_status;
    txclusiveData: Txclusive[] = [];
    typeArray: any = Constants.const_Txclusive_type;
    levelArray: any = Constants.const_Txclusive_level;
    status: Txclusive[] = [];
    pageTitle: string = Constants.const_txclusive_titles.manage_txclusive_list;
    dateFormate = environment.general_const.dateFormate;
    state: State = {
        skip: 0,
        take: Constants.pagination,
    };

    constructor(
        private _txclusiveService: TxclusivelistService,
        private router: Router,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {}

    /**
     * After View Init
     */
    ngAfterViewInit(): void {
        // Get txclusive from firestore
        this._txclusiveService
            .getTxclusiveList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: Txclusive[]) => {
                this.txclusiveData = data;
                // console.log(this.txclusiveData);
                this.status = data;
            });
    }
    /**
     * Get Institute Name display value as per institue Id
     * @param institute_uid
     */

    getTxclusiveInstitueId(institute_uid: String): String {
        if (institute_uid !== '') {
            const levelRecord = this._txclusiveService.institutes.find(
                s =>
                    s.institute_uid !== '' && s.institute_uid === institute_uid,
            );
            if (levelRecord !== undefined) {
                return levelRecord.institute_name;
            } else {
                return '-';
            }
        } else {
            return '-';
        }
    }

    /**
     * filter the status
     */
    viewByFilter(filterValue: number): void {
        if (filterValue === null) {
            this.txclusiveData = this.status;
        } else {
            this.txclusiveData = this.status.filter(
                data => data.status === filterValue,
            );
        }
    }

    /**
     * view the txclusive details method
     */
    onView(id): void {
        this.router.navigate([`/apps/txclusive/txclusive/` + id]);
    }

    /**
     * get the txclusive type name
     */
    getTxclusiveTypeName(type: string | number): string {
        if (type !== '') {
            const typeRecord = this.typeArray.find(
                s => s.value !== '' && Number(s.value) === Number(type),
            );
            return typeRecord.displayValue;
        }
    }

    /**
     * get the txclusive level name
     * @param level
     */
    getTxclusiveLevelName(level: string | number): string {
        if (level !== '') {
            const levelRecord = this.levelArray.find(
                s => s.value !== '' && Number(s.value) === Number(level),
            );
            return levelRecord.displayValue;
        }
    }

    /**
     * get the all status name and display the status
     */
    getStatusName(status: number): void {
        if (status !== null) {
            const statusRecord = this.statusArray.find(
                s => s.value !== null && s.value === status,
            );
            return statusRecord.displayValue;
        }
    }
}
