import { ToasterService } from './../../../../common/services/toaster.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Constants, GeneralError, Status } from 'assets/config/webconfig';
import { MetaService } from 'app/common/services/meta.service';
import { MetaConstant } from 'assets/config/meta';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TrivialistService } from './trivialist.service';
import { takeUntil } from 'rxjs/operators';
import { State } from '@progress/kendo-data-query';

import { TriviaType } from '../trivia.model';

@Component({
    selector: 'app-trivialist',
    templateUrl: './trivialist.component.html',
    styleUrls: ['./trivialist.component.scss'],
})
export class TrivialistComponent implements OnInit, OnDestroy, AfterViewInit {
    private _unSubcribeServices: Subject<any>;

    // Component variables
    public headerTitle: String = Constants.const_trivias_titles.manage_trivia;
    public pageTitle: String =
        Constants.const_trivias_titles.manage_trivia_list;
    public triviaTypeArray: TriviaType[] = Constants.const_trivia_type;
    statusArray: Status[] = Constants.trivia_status;
    public triviaData: any = [];
    public triviaQuoteData = [];
    triviaQuizData = [];
    triviaPollData = [];
    public state: State = {
        skip: 0,
        take: Constants.pagination,
    };
    loading: false;
    public defaultTrivia = 0;
    statusData: any = [];

    /**
     * Constructor
     * @param {MetaService} _metaService
     * @param {Router} _router
     * @param {TrivialistService} _triviaService
     * @param {ToasterService} _toastrService
     */
    constructor(
        private _metaService: MetaService,
        private _router: Router,
        private _triviaService: TrivialistService,
        private _toastrService: ToasterService,
    ) {
        this._unSubcribeServices = new Subject();

        // Update metas
        this._metaService.updateTitle(MetaConstant.Trivia.title);
        this._metaService.updateMetaInfo(
            MetaConstant.Trivia.description,
            MetaConstant.Trivia.author,
            MetaConstant.Trivia.keywords,
        );
    }

    /**
     * On init .
     * Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     */
    ngOnInit(): void {}

    /**
     * After view init.
     * Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
     */
    ngAfterViewInit(): void {
        this._triviaService
            .getTrivias()
            .pipe(takeUntil(this._unSubcribeServices))
            .subscribe(
                data => {
                    this.triviaData = data;
                    this.statusData = data;
                    this.setTriviaData();
                },
                error => {
                    this._toastrService.error(GeneralError.general_error_msg);
                },
            );
    }

    /**
     * Navigate to create trivia page
     */
    navigateCreateTrivia(): void {
        this._router.navigate([`/apps/trivias/trivia`]);
    }

    /**
     * Sets trivia data from actual data
     */
    setTriviaData(): void {
        const quoteData = [],
            pollData = [],
            quizData = [];
        if (this.triviaData !== undefined && this.triviaData.length !== 0) {
            this.triviaData.forEach(element => {
                if (element.trivia_type === 0) {
                    quizData.push(element);
                } else if (element.trivia_type === 1) {
                    pollData.push(element);
                } else if (element.trivia_type === 2) {
                    quoteData.push(element);
                }
            });
        }
        this.triviaQuoteData = quoteData;
        this.triviaPollData = pollData;
        this.triviaQuizData = quizData;
    }

    viewByFilter(filterValue: number): void {
        if (filterValue === null) {
            this.triviaData = this.statusData;
        } else {
            this.triviaData = this.statusData.filter(
                data => data.status === filterValue,
            );
        }
    }

    /**
     * On destroy.
     * Called once, before the instance is destroyed.
     */
    ngOnDestroy(): void {
        // Unsubscribe services
        this._unSubcribeServices.next();
        this._unSubcribeServices.complete();
    }
}
