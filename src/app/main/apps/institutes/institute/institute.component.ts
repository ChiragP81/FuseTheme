import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {
    Constants,
    GeneralError,
    GeneralMsg,
    Status,
} from 'assets/config/webconfig';
import { ToasterService } from 'app/common/services/toaster.service';
import { MetaService } from 'app/common/services/meta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MetaConstant } from 'assets/config/meta';
import { InstituteService } from './institute.service';
import { UploadDataService } from 'app/common/services/upload.service';
import { takeUntil } from 'rxjs/operators';
import { Institute } from '../institue.model';

@Component({
    selector: 'app-institute',
    templateUrl: './institute.component.html',
    styleUrls: ['./institute.component.scss'],
})
export class InstituteComponent implements OnInit, OnDestroy {
    // Private
    private _unsubscribeAll: Subject<any>;

    // Component variables
    public pageTitle: String = '';
    instituteData: any = [];
    instituteForm: FormGroup;

    status: Status[] = Constants.institute_status;
    imageAcceptTypes: string = ['.jpg', '.png', '.gif'].toString();
    instituteImageFile: any = [];
    urlPatternError: String = GeneralError.weburl_validate;
    userLoginData = JSON.parse(localStorage.userInfo);

    /**
     * Constructor
     * @param {ToasterService} _toastrService Provides material toastr
     * @param {MetaService} _metaService Provides meta tag services
     * @param {Router} router Provides the navigation and url manipulation capabilities
     * @param {FormBuilder} _formBuilder Provide form group arrays for form controls
     * @param {InstituteService} _instituteService Provide access to institute service methods
     */
    constructor(
        private _toastrService: ToasterService,
        private _metaService: MetaService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private _instituteService: InstituteService,
        private _uploadService: UploadDataService,
        private activatedRoute: ActivatedRoute,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._metaService.updateTitle(MetaConstant.InstituteAdd.title);
        this._metaService.updateMetaInfo(
            MetaConstant.InstituteAdd.description,
            MetaConstant.InstituteAdd.author,
            MetaConstant.InstituteAdd.keywords,
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        const instituteId = this.activatedRoute.snapshot.paramMap.get('id');

        // Reactive form controls
        this.instituteForm = this._formBuilder.group({
            institute_name: ['', Validators.required],
            institute_alumni_name: ['', Validators.required],
            contact_address: ['', Validators.required],
            institute_city: ['', Validators.required],
            institute_province: ['', Validators.required],
            institute_postcode: ['', Validators.required],
            institute_nation: ['', Validators.required],
            institute_jesuit_province: ['', Validators.required],
            institute_short_name: ['', Validators.required],
            institute_zone: ['', Validators.required],
            contact_name: ['', Validators.required],
            contact_phone: ['', Validators.required],
            contact_email: ['', [Validators.required, Validators.email]],
            institute_web_url: [
                '',
                [Validators.required, Validators.pattern(Constants.urlPattern)],
            ],
            institute_motto: ['', Validators.required],
            institute_description: ['', Validators.required],
            status: ['', Validators.required],
            institute_image: instituteId ? [''] : ['', Validators.required],
        });

        this.pageTitle = Constants.const_institute_titles.manage_institute_add;
        if (instituteId !== undefined && instituteId !== null) {
            this.getInstituteData(instituteId);

            // Update institute edit meta tags
            this._metaService.updateTitle(MetaConstant.InstituteEdit.title);
            this._metaService.updateMetaInfo(
                MetaConstant.InstituteEdit.description,
                MetaConstant.InstituteEdit.author,
                MetaConstant.InstituteEdit.keywords,
            );
            this.pageTitle =
                Constants.const_institute_titles.manage_institute_edit;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data of particular institute id
     * @param instituteId
     */
    getInstituteData(instituteId): void {
        this._instituteService
            .getInstitute(instituteId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: Institute) => {
                if (data === undefined || data === null) {
                    this._toastrService.error(GeneralError.institute_notexist);
                    setTimeout(() => {
                        this.cancelForm();
                    }, 1000);
                } else {
                    this.instituteData = data;
                    this.setEditForm();
                }
            });
    }

    /**
     * Set values in form fields to update
     */
    setEditForm(): void {
        const data = this.instituteData;
        this.instituteForm.setValue({
            institute_name: data.institute_name,
            institute_alumni_name: data.institute_alumni_name,
            contact_address: data.contact_address,
            institute_city: data.institute_city,
            institute_province: data.institute_province,
            institute_postcode: data.institute_postcode,
            institute_nation: data.institute_nation,
            institute_jesuit_province: data.institute_jesuit_province,
            institute_short_name: data.institute_short_name,
            institute_zone: data.institute_zone,
            contact_name: data.contact_name,
            contact_phone: data.contact_phone,
            contact_email: data.contact_email,
            institute_web_url: data.institute_web_url,
            institute_motto: data.institute_motto,
            institute_description: data.institute_description,
            status: data.status,
            institute_image: data.institute_image,
        });
    }

    /**
     * Upload image event method
     * @param event
     */
    uploadImage(files: FileList): void {
        this.instituteImageFile = files[0];
        this.instituteForm.controls['institute_image'].setValue(''); // <-- Set Value for Validation
        if (
            this.instituteImageFile !== undefined &&
            this.instituteImageFile !== null
        ) {
            this.validImage();
            this.instituteForm.controls['institute_image'].setValue(
                this.instituteImageFile.name,
            ); // <-- Set Value for Validation
        }
    }

    /**
     * Redirect to institute listing page
     */
    cancelForm(): void {
        this.router.navigate(['/apps/institutes/institutelist']);
    }

    /**
     * Submit institute form
     */
    submitInstituteForm(): boolean {
        if (this.instituteForm.valid) {
            const inputParam = this.instituteForm.value;
            inputParam.institute_alumni_id = inputParam.institute_alumni_name;
            inputParam.status = Number(this.instituteForm.value.status);
            if (this.instituteData === undefined) {
                inputParam.institute_image = '';
                inputParam.admin_uid =
                    this.userLoginData.user_uid === undefined
                        ? this.userLoginData._id !== undefined
                            ? this.userLoginData._id
                            : ''
                        : this.userLoginData.user_uid === undefined;
            } else {
                inputParam.admin_uid = this.instituteData.admin_uid;
            }

            inputParam.created_at = new Date();
            inputParam.updated_at = new Date();

            const uploadDirName = 'institutes';
            let successMsg = GeneralMsg.institute_create;

            if (
                this.instituteData !== undefined &&
                this.instituteData.institute_uid !== undefined &&
                this.instituteData.institute_uid !== ''
            ) {
                inputParam.institute_uid = this.instituteData.institute_uid;
                successMsg = GeneralMsg.institute_update;
                inputParam.created_at = this.instituteData.created_at;
            }

            if (
                (this.instituteData === undefined ||
                    this.instituteData.institute_image === undefined ||
                    this.instituteData.institute_image === '') &&
                (this.instituteImageFile.length === 0 ||
                    this.instituteImageFile === undefined ||
                    this.instituteImageFile === null)
            ) {
                this._toastrService.error(GeneralError.no_image_validate);
                return false;
            } else if (
                this.instituteImageFile !== undefined &&
                this.instituteImageFile.length !== 0
            ) {
                this.validImage();
                this._uploadService
                    .uploadFile(uploadDirName, this.instituteImageFile)
                    .then((url: any) => {
                        if (url) {
                            inputParam.institute_image = url;

                            this._instituteService
                                .addUpdateInstitute(inputParam)
                                .then(data => {
                                    if (data) {
                                        this._toastrService.success(successMsg);
                                        this.cancelForm();
                                    }
                                })
                                .catch(error => {
                                    this._toastrService.error(
                                        GeneralError.general_error_msg,
                                    );
                                });
                        }
                    })
                    .catch(() => {
                        this._toastrService.error(
                            GeneralError.image_upload_error,
                        );
                    });
            } else {
                this._instituteService
                    .addUpdateInstitute(inputParam)
                    .then(data => {
                        if (data) {
                            this._toastrService.success(successMsg);
                            this.cancelForm();
                        }
                    })
                    .catch(_error => {
                        this._toastrService.error(
                            GeneralError.general_error_msg,
                        );
                    });
            }
        } else {
            this._toastrService.error(GeneralError.form_validate);
        }
    }

    /**
     * Validates phone number according to indian number format
     * @returns void
     * @param event
     */
    validatePhnNum(event: any): void {
        const pattern = /[0-9\+\-\ ]/;

        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode !== 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    validImage(): any {
        const extension =
            this.instituteImageFile.name.substring(
                this.instituteImageFile.name.lastIndexOf('.') + 1,
                this.instituteImageFile.name.length,
            ) || this.instituteImageFile.name;
        const imgSize = this.instituteImageFile.size / 1024 / 1024;

        // Check valid image type
        if (
            typeof extension === 'undefined' ||
            extension === null ||
            Constants.image_types_array.indexOf(extension) > -1 === false
        ) {
            this._toastrService.error(
                `${GeneralError.image_validate} (${
                    Constants.image_types_array
                })`,
            );
            return false;

            // Check image size
        } else if (imgSize > Constants.image_size) {
            this._toastrService.error(GeneralError.image_size_validate);
            return false;
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
