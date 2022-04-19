import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants, GeneralError, GeneralMsg } from 'assets/config/webconfig';
import { MetaService } from 'app/common/services/meta.service';
import { MetaConstant } from 'assets/config/meta';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteroleService } from './instituterole.service';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from 'app/common/services/toaster.service';
import { InstituteData } from '../institue.model';
import { User } from '../../users/user.model';


@Component({
    selector: 'app-instituterole',
    templateUrl: './instituterole.component.html',
    styleUrls: ['./instituterole.component.scss'],
})
export class InstituteroleComponent implements OnInit, OnDestroy {
    // Observable subject
    private _unsubscribeService: Subject<any>;

    // Component variables
    public pageTitle: string =
        Constants.const_institute_titles.manage_institute_role;
    public instituteRoleData: InstituteData;
    public roleArray: any = [];
    institute_uid = '';
    upper_level_users: User[] = [];
    institute_users: User[] = [];
    badgeUrl = Constants.STATIC_IMG_URL;
    selectedUser: any;
    selectedValue: Number;

    /**
     * Constructor
     * @param {MetaService} _metaService Provides meta tag services
     * @param {ActivatedRoute} _activatedRoute Contains route paramters and other data that are associated with component
     * @param {InstituteroleService} _instituteService Provides access to institute service
     * @param {ToasterService} _toastrService Provides material toastr
     * @param {Router} _router  Provides the navigation and url manipulation capabilities
     */
    constructor(
        private _metaService: MetaService,
        private _activatedRoute: ActivatedRoute,
        private _instituteService: InstituteroleService,
        private _toastrService: ToasterService,
        private _router: Router,
    ) {
        // Update meta tags
        this._metaService.updateTitle(MetaConstant.InstituteRole.title);
        this._metaService.updateMetaInfo(
            MetaConstant.InstituteRole.description,
            MetaConstant.InstituteRole.author,
            MetaConstant.InstituteRole.keywords,
        );
        this._unsubscribeService = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit(): void {
        this.institute_uid = this._activatedRoute.snapshot.paramMap.get('id');
        if (this.institute_uid !== undefined && this.institute_uid !== '') {
            this.getInstitute(this.institute_uid);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get institute data to assign / manage role
     * @param institute_uid
     */
    getInstitute(institute_uid: string): void {
        this._instituteService
            .getInstituteData(institute_uid)
            .pipe(takeUntil(this._unsubscribeService))
            .subscribe(
                (data: InstituteData) => {
                    if (typeof data !== 'undefined' && data !== null) {
                        this.instituteRoleData = data;
                        this.getManagerList();
                        this.generateUserRoleArray();
                    } else {
                        this._toastrService.error(
                            GeneralError.institute_notexist,
                        );
                        setTimeout(() => {
                            this.redirectToListing();
                        }, 1000);
                    }
                },
                error => {
                    this._toastrService.error(error.message);
                },
            );
    }

    /**
     * Redirect to institute listing page
     */
    redirectToListing(): void {
        this._router.navigate(['/apps/institutes/institutelist']);
    }

    /**
     * Get list of users whose user type not 0 i.e. normal user
     * & whose institute id matches with selected users
     */
    getManagerList(): void {
        this._instituteService
            .getUsersList()
            .pipe(takeUntil(this._unsubscribeService))
            .subscribe(
                (data: User[]) => {
                    if (
                        typeof data !== 'undefined' &&
                        data !== null &&
                        data.length > 0
                    ) {
                        this.upper_level_users = data;
                        const instituteManager = [];
                        this.upper_level_users.forEach(element => {
                            if (
                                element.institutes !== undefined &&
                                element.institutes.length > 0
                            ) {
                                element.institutes.forEach(
                                    (innerElement: any) => {
                                        if (
                                            innerElement.institute_uid ===
                                                this.institute_uid &&
                                            innerElement.verify_status === 1
                                        ) {
                                            instituteManager.push(element);
                                        }
                                    },
                                );
                            }
                        });
                        this.institute_users = instituteManager;
                        if (this.institute_users.length === 0) {
                            this._toastrService.error(
                                GeneralError.no_assignment_users,
                            );
                        }
                    } else {
                        this._toastrService.error(
                            GeneralError.no_assignment_users,
                        );
                    }
                },
                error => {
                    this._toastrService.error(error.message);
                },
            );
    }

    /**
     * Generate user institute role array
     */
    generateUserRoleArray(): void {
        const user_type_array: any = Constants.const_institute_users;
        this.roleArray = [];

        // roles
        user_type_array.forEach(element => {
            let displayEditRoles = 0;
            element.displayChange = 0;
            let user_type_value: String = '';
            if (
                element.user_type_key === 'institute_chairman' &&
                this.instituteRoleData.institute_chairman !== undefined &&
                this.instituteRoleData.institute_chairman !== ''
            ) {
                user_type_value = this.instituteRoleData.institute_chairman;
                displayEditRoles = 1;
            } else if (
                element.user_type_key === 'institute_president' &&
                this.instituteRoleData.institute_president !== undefined &&
                this.instituteRoleData.institute_president !== ''
            ) {
                user_type_value = this.instituteRoleData.institute_president;
                displayEditRoles = 1;
            } else if (
                element.user_type_key === 'institute_secretary' &&
                this.instituteRoleData.institute_secretary !== undefined &&
                this.instituteRoleData.institute_secretary !== ''
            ) {
                user_type_value = this.instituteRoleData.institute_secretary;
                displayEditRoles = 1;
            } else if (
                element.user_type_key === 'institute_txc_champion' &&
                this.instituteRoleData.institute_txc_champion !== undefined &&
                this.instituteRoleData.institute_txc_champion !== ''
            ) {
                user_type_value = this.instituteRoleData.institute_txc_champion;
                displayEditRoles = 1;
            } else if (
                element.user_type_key === 'institute_province_officer' &&
                this.instituteRoleData.institute_province_officer !==
                    undefined &&
                this.instituteRoleData.institute_province_officer !== ''
            ) {
                user_type_value = this.instituteRoleData
                    .institute_province_officer;
                displayEditRoles = 1;
            } else if (
                element.user_type_key === 'institute_zonal_officer' &&
                this.instituteRoleData.institute_zonal_officer !== undefined &&
                this.instituteRoleData.institute_zonal_officer !== ''
            ) {
                user_type_value = this.instituteRoleData
                    .institute_zonal_officer;
                displayEditRoles = 1;
            } else if (
                element.user_type_key === 'institute_national_officer' &&
                this.instituteRoleData.institute_national_officer !==
                    undefined &&
                this.instituteRoleData.institute_national_officer !== ''
            ) {
                user_type_value = this.instituteRoleData
                    .institute_national_officer;
                displayEditRoles = 1;
            } else if (
                element.user_type_key === 'institute_super_admin' &&
                this.instituteRoleData.institute_super_admin !== undefined &&
                this.instituteRoleData.institute_super_admin !== ''
            ) {
                user_type_value = this.instituteRoleData.institute_super_admin;
                displayEditRoles = 1;
            }
            element.user_type_value = user_type_value;
            element.displayChange = displayEditRoles;
            this.roleArray.push(element);
        });

        const tempArray = this.institute_users;
        const assignedArray = [];
        if (tempArray !== undefined && tempArray.length > 0) {
            tempArray.forEach((element, index) => {
                if (
                    element.user_uid ===
                        this.instituteRoleData.institute_chairman ||
                    element.user_uid ===
                        this.instituteRoleData.institute_president ||
                    element.user_uid ===
                        this.instituteRoleData.institute_secretary ||
                    element.user_uid ===
                        this.instituteRoleData.institute_txc_champion ||
                    element.user_uid ===
                        this.instituteRoleData.institute_province_officer ||
                    element.user_uid ===
                        this.instituteRoleData.institute_zonal_officer ||
                    element.user_uid ===
                        this.instituteRoleData.institute_national_officer ||
                    element.user_uid ===
                        this.instituteRoleData.institute_super_admin
                ) {
                    assignedArray.push(index);
                }
            });

            if (assignedArray.length > 0) {
                assignedArray.forEach(element => {
                    tempArray.splice(element, 1);
                });
            }
        }
        this.institute_users = tempArray;
    }

    /**
     * Assing user to institute role and update institute data
     * @param event
     * @param role
     */
    assignUser(event, role): any {
        this.selectedUser = event.value;
        const selectedRole = role.user_type_key;
        if (this.institute_users.length === 0) {
            this._toastrService.error(GeneralError.no_assignment_users);
            return false;
        }
        if (this.selectedUser !== undefined) {
            this._instituteService
                .updateInstituteRole(
                    selectedRole,
                    this.selectedUser,
                    this.instituteRoleData,
                )
                .then((data: string) => {
                    if (data === 'Success') {
                        this._instituteService
                            .updateUserInstitute(
                                this.selectedUser,
                                this.instituteRoleData,
                                role.user_type,
                            )
                            .then(data => {
                                if (data === 'Success') {
                                    this._toastrService.success(
                                        GeneralMsg.institute_update,
                                    );
                                    this.getInstitute(
                                        this.instituteRoleData.institute_uid,
                                    );
                                }
                                this.selectedValue = this.instituteRoleData.status;

                                const index = this.institute_users.findIndex(
                                    institute =>
                                        institute.user_uid ===
                                        this.selectedUser,
                                );
                                this.institute_users.splice(index, 1);
                            })
                            .catch((error: any) => {
                                this._toastrService.error(error.message);
                            });
                    } else {
                        this._toastrService.error(
                            GeneralError.general_error_msg,
                        );
                    }
                })
                .catch((error: any) => {
                    this._toastrService.error(error.message);
                });
        } else {
            this._toastrService.error('Please select any user');
            return false;
        }
    }

    /**
     * Toggle view in html for change and assign button
     * @param role Selected role
     */
    changeView(role): void {
        const temp = [];
        this.roleArray.forEach(element => {
            if (Number(element.user_type) === Number(role.user_type)) {
                element.displayChange = 1;
            } else {
                element.displayChange = 0;
            }
            temp.push(element);
        });
        this.roleArray = temp;
    }

    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe subscriptions
        this._unsubscribeService.next();
        this._unsubscribeService.complete();
    }
}
