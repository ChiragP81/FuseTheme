import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MetaService } from 'app/common/services/meta.service';
import { Constants, Status } from 'assets/config/webconfig';
import { Subject } from 'rxjs';
import { MetaConstant } from 'assets/config/meta';
import { State, process } from '@progress/kendo-data-query';
import { NewslistService } from './newslist.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
    GridDataResult,
    DataStateChangeEvent,
} from '@progress/kendo-angular-grid';
import { News } from '../news.model';

@Component({
    selector: 'app-newslist',
    templateUrl: './newslist.component.html',
    styleUrls: ['./newslist.component.scss'],
})
export class NewslistComponent implements OnInit, OnDestroy, AfterViewInit {
    // Private Subscription Subject
    private _unSubscription: Subject<any>;
    public newsGridData: News[] = [];
    public gridData: GridDataResult;
    public pageTitle: String = Constants.const_news_titles.manage_news_list;
    public state: State = {
        skip: 0,
        take: Constants.pagination,
    };

    statusdata: News[] = [];
    statusArray: Status[] = Constants.news_status;

    /**
     * Constructor
     * @param {MetaService} _metaService Service to update meta tags and title
     * @param {NewslistService} _newsListService Service to access news data
     * @param {Router} _router Provides the navigation and url manipulation capabilities.
     */
    constructor(
        private _metaService: MetaService,
        private _newsListService: NewslistService,
        private _router: Router,
    ) {
        this._unSubscription = new Subject();
        // Update meta tags
        this._metaService.updateTitle(MetaConstant.NewsList.title);
        this._metaService.updateMetaInfo(
            MetaConstant.NewsList.description,
            MetaConstant.NewsList.author,
            MetaConstant.NewsList.keywords,
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
        // Get news listing from db through service
        this._newsListService
            .getNewsListing()
            .pipe(takeUntil(this._unSubscription))
            .subscribe((data: News[]) => {
                this.newsGridData = data;
                this.statusdata = data;
                this.gridData = process(this.newsGridData, this.state);
            });
    }

    viewByFilter(filterValue: number): void {
        if (filterValue === null) {
            this.newsGridData = this.statusdata;
        } else {
            this.newsGridData = this.statusdata.filter(
                data => data.status === filterValue,
            );
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Grid data state change event
     * @param state
     */
    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.newsGridData, this.state);
    }

    /**
     * Navigate to add news
     */
    addNews(): void {
        this._router.navigate(['/apps/news/add']);
    }

    /**
     * Navigate to edit news
     * @param news_uid String
     */
    editNews(news_uid: String): void {
        this._router.navigate([`/apps/news/${news_uid}/edit`]);
    }

    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe subscriptions
        this._unSubscription.next();
        this._unSubscription.complete();
    }
}
