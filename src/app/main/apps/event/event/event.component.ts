import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Constants, GeneralError, GeneralMsg } from 'assets/config/webconfig';
import { EventService } from './event.service';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from 'app/common/services/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { MatDialog } from '@angular/material';
import { DetailPopupComponent } from './detail-popup/detail-popup.component';
import { EventData } from '../event.model';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;
    pageTitle: string = Constants.const_event_titles.manage_event_view;
    levelArray: any = Constants.const_Event_level;
    typeArray: any = Constants.const_Event_type;
    dateFormate = environment.general_const.dateFormate;

    eventViewData: any = [];
    countryName: string;
    stateName: string;
    cityName: string;
    event_uid: string;
    reason: string;
    dialogRef: any;
    userInfo: any = [];
    constructor(
        private _eventService: EventService,
        private _toastrService: ToasterService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.event_uid = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.event_uid !== undefined) {
            this.getEventData(this.event_uid);
        }

        if (localStorage.getItem('userInfo')) {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
    }

    submitForm(): void {
        const params = {
            user_uid: this.userInfo.user_uid,
            event_uid: this.event_uid,
            status: this.eventViewData.status,
            doc_id: '',
            role_id: this.userInfo.user_type,
            updated_at: new Date(),
            reason: this.reason,
        };
        this._eventService.submitForm(params);
    }

    /**
     * Redirect to manage user list
     * @returns void
     */
    back(): void {
        this.router.navigate(['/apps/event/eventlist']);
    }

    /**
     * Get user data from collection
     * @param userId string : Id of user to get data
     */
    getEventData(eventId: string): void {
        this._eventService
            .getEventList(eventId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: EventData) => {
                    this.eventViewData = data;
                    if (
                        !(
                            typeof this.eventViewData !== 'undefined' &&
                            this.eventViewData !== null
                        )
                    ) {
                        this._toastrService.error(GeneralError.event_notexist);
                        setTimeout(() => {
                            this.back();
                        }, 800);
                    } else {
                        this.getCountryName();
                        this.getStateName();
                        this.getCityName();
                    }
                },
                error => {
                    this._toastrService.error(error.message);
                },
            );
    }

    /**
     * Get level display value as per level value
     * @param level
     */
    getEventLevelName(level: string | number): string {
        if (level !== '') {
            const levelRecord = this.levelArray.find(
                s => s.value !== '' && Number(s.value) === Number(level),
            );
            return levelRecord.displayValue;
        }
    }

    /**
     * Get Type display value as per Type value
     * @param type
     */
    getEventTypeName(type: string | number): any {
        if (type !== '') {
            const typeRecord = this.typeArray.find(
                s => s.value !== '' && Number(s.value) === Number(type),
            );
            return typeRecord.displayValue;
        }
    }

    openDialog(): any {
        if (this.eventViewData.status === 0) {
            this.eventApprove();
        } else if (this.eventViewData.status === 1) {
            this.eventReject();
        }
    }

    eventApprove(): void {
        let successMsg = '';
        this.eventViewData.status = 1;
        this._eventService
            .updateStatus(this.eventViewData)
            .then((data: string) => {
                if (data === 'Success') {
                    successMsg = GeneralMsg.event_approve;
                    this._toastrService.success(successMsg);
                    this.router.navigate(['apps/event/eventlist']);
                    this.submitForm();
                } else {
                    this._toastrService.error(GeneralError.general_error_msg);
                }
            })
            .catch(err => {
                this._toastrService.error(err.message);
                this.getEventData(this.event_uid);
            });
    }

    eventReject(): void {
        let successMsg = '';
        this.eventViewData.status = 0;
        this.dialogRef = this.dialog.open(DetailPopupComponent, {
            height: 'auto',
            width: '500px',
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.reason = response;
            this._eventService
                .updateStatus(this.eventViewData)
                .then((data: string) => {
                    if (data === 'Success') {
                        successMsg = GeneralMsg.event_disapprove;
                        this._toastrService.success(successMsg);
                        this.submitForm();
                        this.router.navigate(['apps/event/eventlist']);
                    } else {
                        this._toastrService.error(
                            GeneralError.general_error_msg,
                        );
                    }
                })
                .catch(err => {
                    this._toastrService.error(err.message);
                    this.getEventData(this.event_uid);
                });
        });
    }

    getCountryName(): void {
        if (
            typeof this.eventViewData.event_country !== 'undefined' &&
            this.eventViewData.event_country.name
        ) {
            this.countryName = this.eventViewData.event_country.name;
        }
    }

    getStateName(): void {
        if (
            typeof this.eventViewData.event_state !== 'undefined' &&
            this.eventViewData.event_state.name
        ) {
            this.stateName = this.eventViewData.event_state.name;
        }
    }

    getCityName(): void {
        if (
            typeof this.eventViewData.event_city !== 'undefined' &&
            this.eventViewData.event_city.name
        ) {
            this.cityName = this.eventViewData.event_city.name;
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
