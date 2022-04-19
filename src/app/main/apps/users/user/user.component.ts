import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Constants, GeneralError, GeneralMsg } from 'assets/config/webconfig';
import { MetaService } from 'app/common/services/meta.service';
import { MetaConstant } from 'assets/config/meta';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from 'app/common/services/toaster.service';
import { environment } from 'environments/environment';
import { User } from '../user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
    // Private defaults
    private _unsubscribeAll: Subject<any>;
    public dateFormate = environment.general_const.dateFormate;

    public pageTitle: string = Constants.const_user_titles.manage_user_view;
    public userViewData: any = [];
    user_uid: string;
    countryName: string;
    stateName: string;
    cityName: string;
    useris_verified = true;

    /**
     * Constructor
     * @param {MetaService} _metaService
     * @param {UserService} _userService
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     * @param {ToasterService} _toastrService
     */
    constructor(
        private _metaService: MetaService,
        private _userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _toastrService: ToasterService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._metaService.updateTitle(MetaConstant.UserView.title);
        this._metaService.updateMetaInfo(
            MetaConstant.UserView.description,
            MetaConstant.UserView.author,
            MetaConstant.UserView.keywords,
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get user id from url parameters
        this.user_uid = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.user_uid !== undefined) {
            this.getUserData(this.user_uid);
        }
    }

    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get user data from collection
     * @param userId string : Id of user to get data
     */
    getUserData(userId: string): void {
        this._userService
            .getUserList(userId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: User) => {
                    this.userViewData = data;
                    console.log(this.userViewData);
                    if (
                        !(
                            typeof this.userViewData !== 'undefined' &&
                            this.userViewData !== null
                        )
                    ) {
                        this._toastrService.error(GeneralError.user_notexist);
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
     * Redirect to manage user list
     * @returns void
     */
    back(): void {
        this.router.navigate(['/apps/users/userlist']);
    }

    /**
     * Update institute request status of user
     * @param index string | number : To get institue of following user
     * @returns void
     */
    updateInstituteStatus(index: string | number): void {
        const currentStatus = Number(
            this.userViewData.institutes[index].verify_status,
        );
        let successMsg: any = '';
        if (currentStatus === 0) {
            this.userViewData.institutes[index].verify_status = 1;
            successMsg = GeneralMsg.institute_approve;
        } else if (currentStatus === 1) {
            this.userViewData.institutes[index].verify_status = 0;
            successMsg = GeneralMsg.institute_disapprove;
        }
        this.useris_verified = true;
        this.userViewData.institutes.filter(data => {
            if (data.verify_status === 0) {
                this.useris_verified = false;
            }
        });

        this._userService
            .updateInstitue(this.userViewData, this.useris_verified)
            .then((data: string) => {
                if (data === 'Success') {
                    this._toastrService.success(successMsg);
                } else {
                    this._toastrService.error(GeneralError.general_error_msg);
                }
            })
            .catch(err => {
                this._toastrService.error(err.message);
                this.getUserData(this.user_uid);
            });
    }

    getCountryName(): void {
        if (
            typeof this.userViewData.country !== 'undefined' &&
            this.userViewData.country.name
        ) {
            this.countryName = this.userViewData.country.name;
        }
    }

    getStateName(): void {
        if (
            typeof this.userViewData.state !== 'undefined' &&
            this.userViewData.state.name
        ) {
            this.stateName = this.userViewData.state.name;
        }
    }

    getCityName(): void {
        if (
            typeof this.userViewData.city !== 'undefined' &&
            this.userViewData.city.name
        ) {
            this.cityName = this.userViewData.city.name;
        }
    }
}
