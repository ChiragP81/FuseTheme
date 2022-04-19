import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AdvertListService } from './advertlist.service';
import {
    GridDataResult,
    DataStateChangeEvent,
} from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Constants } from '../../../../../assets/config/webconfig';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MetaService } from '../../../../common/services/meta.service';
import { MetaConstant } from '../../../../../assets/config/meta';
import { takeUntil } from 'rxjs/operators';
import { Advert } from '../advert.model';

@Component({
    selector: 'app-advertlist',
    templateUrl: './advertlist.component.html',
    styleUrls: ['./advertlist.component.scss'],
})
export class AdvertlistComponent implements OnInit, AfterViewInit, OnDestroy {
    advertGrid: GridDataResult;
    pageTitle: any = Constants.const_affiliate_ad.Affiliate_Advert_List;
    status: any = Constants.status;
    statusData: Advert[] = [];
    adverts: Advert[] = [];
    state: State = {
        skip: 0,
        take: Constants.pagination,
    };
    constructor(
        private advertListService: AdvertListService,
        public router: Router,
        private _metaService: MetaService,
    ) {
        this.setSEOTags();
    }
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.listHandler();
    }

    setSEOTags(): void {
        this.pageTitle = MetaConstant.AdvertList.title;
        this._metaService.updateTitle(this.pageTitle);
        this._metaService.updateMetaInfo(
            MetaConstant.AdvertList.description,
            MetaConstant.AdvertList.author,
            MetaConstant.AdvertList.keywords,
        );
    }

    listHandler(): Advert[] {
        return this.advertListService
            .getBanner()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: Advert[]) => {
                this.adverts = data;
                console.log(this.adverts);
                this.statusData = data;
                this.advertGrid = process(this.adverts, this.state);
            });
    }
    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.advertGrid = process(this.adverts, this.state);
    }
    viewByFilter(filterValue: number): void {
        if (filterValue === null) {
            this.adverts = this.statusData;
        } else {
            this.adverts = this.statusData.filter(
                data => data.banner_status === filterValue,
            );
        }
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
