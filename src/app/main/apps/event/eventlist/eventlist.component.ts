import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { State } from '@progress/kendo-data-query';
import { Constants, Status } from 'assets/config/webconfig';
import { environment } from 'environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { EventlistService } from './eventlist.service';
import { Event } from '../event.model';
import { Institute } from '../../institutes/institue.model';

@Component({
    selector: 'app-eventlist',
    templateUrl: './eventlist.component.html',
    styleUrls: ['./eventlist.component.scss'],
})
export class EventlistComponent implements OnInit, AfterViewInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;
    public dateFormate = environment.general_const.dateFormate;
    levelArray: any = Constants.const_Event_level;
    typeArray: any = Constants.const_Event_type;
    statusArray: Status[] = Constants.const_Event_status;
    status: Event[] = [];
    public pageTitle: String = Constants.const_event_titles.manage_event_list;
    eventData: Event[] = [];
    instituteData: Institute[] = [];
    state: State = {
        skip: 0,
        take: Constants.pagination,
    };

    constructor(
        private _eventService: EventlistService,
        public _angularFire: AngularFirestore,
        private router: Router,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
    }

    /**
     * After View Init
     */
    ngAfterViewInit(): void {
        // Get event from firestore
        this._eventService
            .getEventList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: Event[]) => {
                this.eventData = data;
                this.status = data;
            });
    }

    /**
     * Get Institute Name display value as per institue Id
     * @param institute_uid
     */

    getEventInstitueId(institute_uid: String): String {
        if (institute_uid !== '') {
            const levelRecord = this._eventService.institutes.find(
                s =>
                    s.institute_uid !== '' && s.institute_uid === institute_uid,
            );
            if (levelRecord !== undefined) {
                console.log(levelRecord);
                return levelRecord.institute_name;
            } else {
                return '-';
            }
        } else {
            return '-';
        }
    }

    onView(id): void {
        this.router.navigate([`/apps/event/event/` + id]);
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
    getEventTypeName(type: string | number): string {
        if (type !== '') {
            const typeRecord = this.typeArray.find(
                s => s.value !== '' && Number(s.value) === Number(type),
            );
            return typeRecord.displayValue;
        }
    }

    /**
     * Get status display value as per status value
     * @param status
     */
    getStatusName(status: number): string {
        if (status !== null) {
            const statusRecord = this.statusArray.find(
                s => s.value !== null && s.value === status,
            );
            return statusRecord.displayValue;
        }
    }

    /**
     * filter the status
     */
    viewByFilter(filterValue: number): void {
        if (filterValue === null) {
            this.eventData = this.status;
        } else {
            this.eventData = this.status.filter(
                data => data.status === filterValue,
            );
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
