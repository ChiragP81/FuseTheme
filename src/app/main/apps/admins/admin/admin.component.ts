import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from './admin.service';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from '../../../../common/services/toaster.service';
import {
    GeneralMsg,
    GeneralError,
    Constants,
    Status,
} from '../../../../../assets/config/webconfig';
import { MetaService } from '../../../../common/services/meta.service';
import { MetaConstant } from '../../../../../assets/config/meta';
import { UploadDataService } from 'app/common/services/upload.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { AdminData } from '../admin.model';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
    // Private default
    private _unsubscribeAll: Subject<any>;

    public avatarSourceUrl: SafeUrl | string = '';
    public pageTitle: string = Constants.const_admin_titles.edit_admin;
    public imageAcceptTypes: string = ['.jpg', '.png', '.gif'].toString();
    public statusData: Status[] = Constants.admin_status;

    editAdminForm: FormGroup;
    avatarImageFile: any;
    editAdminData: AdminData;
    inputParam: AdminData;

    /**
     * Constructor
     * {FormBuilder} _formBuilder
     * {Router} router
     * {AdminService} _adminService
     * {ActivatedRoute} activatedRoute
     * {ToasterService} toastrService
     * {MetaService} _metaService
     * {UploadDataService} _uploadService
     * {DomSanitizer} sanitizer
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private _adminService: AdminService,
        private activatedRoute: ActivatedRoute,
        private toastrService: ToasterService,
        private _metaService: MetaService,
        private _uploadService: UploadDataService,
        private sanitizer: DomSanitizer,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._metaService.updateTitle(MetaConstant.AdminEdit.title);
        this._metaService.updateMetaInfo(
            MetaConstant.AdminEdit.description,
            MetaConstant.AdminEdit.author,
            MetaConstant.AdminEdit.keywords,
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Reactive Form
        this.editAdminForm = this._formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: [
                {
                    value: '',
                    disabled: true,
                },
                Validators.required,
            ],
            phone: [
                {
                    value: '',
                    disabled: true,
                },
                [
                    Validators.required,
                    Validators.minLength(13),
                    Validators.maxLength(13),
                ],
            ],
            status: ['', Validators.required],
            user_image: [''],
        });

        const adminEditId = this.activatedRoute.snapshot.paramMap.get('id');
        this.getAdminData(adminEditId);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get manage admin data
     * @param adminId Admin id of selected admin to get data
     */
    getAdminData(adminId: string): void {
        this._adminService
            .getAdminList(adminId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: AdminData) => {
                    this.editAdminData = data;
                    if (typeof this.editAdminData !== 'undefined') {
                        this.setEditData(this.editAdminData);
                    } else {
                        this.toastrService.error(GeneralError.admin_notexist);
                        setTimeout(() => {
                            this.back();
                        }, 800);
                    }
                },
                error => {
                    this.toastrService.error(error.message);
                    setTimeout(() => {
                        this.back();
                    }, 800);
                },
            );
    }

    /**
     * Sets edit form
     * @param data Data of specified admin to edit
     */
    setEditData(data: AdminData): void {
        const editData: AdminData = data;
        this.editAdminForm.setValue({
            first_name:
                editData.first_name !== undefined ? editData.first_name : '',
            last_name:
                editData.last_name !== undefined ? editData.last_name : '',
            email: editData.email !== undefined ? editData.email : '',
            phone: editData.phone !== undefined ? editData.phone : '',
            status:
                editData.status !== undefined ? String(editData.status) : '',
            user_image: '',
        });

        this.avatarSourceUrl = this.sanitizer.bypassSecurityTrustUrl(
            editData.user_image,
        );
    }

    /**
     * Upload admin avatar image
     * @param files File upload event files
     */
    uploadAvatar(files: FileList): any {
        this.avatarImageFile = files[0];

        if (
            this.avatarImageFile !== undefined &&
            this.avatarImageFile !== null
        ) {
            const ext =
                this.avatarImageFile.name.substring(
                    this.avatarImageFile.name.lastIndexOf('.') + 1,
                    this.avatarImageFile.name.length,
                ) || this.avatarImageFile.name;

            const FileSize = this.avatarImageFile.size / 1024 / 1024; // in MB

            // Check file size
            if (FileSize > Constants.image_size) {
                this.toastrService.error(GeneralError.image_size_validate);
                return false;

                // Check valid file type
            } else if (
                typeof ext === 'undefined' ||
                ext === null ||
                Constants.image_types_array.indexOf(ext) > -1 === false
            ) {
                this.toastrService.error(
                    GeneralError.image_validate +
                        ' (' +
                        Constants.image_types_array +
                        ')',
                );
                return false;
            }
        }
    }

    /**
     * Submit form data
     * @returns boolean
     */
    submitEditForm(): boolean {
        if (this.editAdminForm.valid) {
            const form = this.editAdminForm.getRawValue();
            this.inputParam = this.editAdminData;
            this.inputParam.first_name = form.first_name;
            this.inputParam.last_name = form.last_name;
            this.inputParam.email = form.email;
            this.inputParam.phone = form.phone;
            this.inputParam.status = form.status;
            this.inputParam.updated_at = new Date();

            if (
                (this.editAdminData.user_image === undefined ||
                    this.editAdminData.user_image === '') &&
                (this.avatarImageFile.length === 0 ||
                    this.avatarImageFile === undefined ||
                    this.avatarImageFile === null)
            ) {
                this.toastrService.error(GeneralError.no_image_validate);
                return false;
            } else if (
                this.avatarImageFile !== undefined &&
                this.avatarImageFile.length !== 0
            ) {
                this.validFile();
            } else {
                this._adminService
                    .updateAdminData( this.inputParam)
                    .then((data: string) => {
                        if (data === 'Success') {
                            this.toastrService.success(GeneralMsg.admin_update);
                            this.back();
                        } else {
                            this.toastrService.error(
                                GeneralError.general_error_msg,
                            );
                        }
                    })
                    .catch(err => {
                        this.toastrService.error(err.message);
                    });
            }
        } else {
            this.toastrService.error(GeneralError.form_validate);
        }
    }

    /**
     * Redirects to manage admin
     * @returns void
     */
    back(): void {
        this.router.navigate(['/apps/admins/adminlist']);
    }

    /**
     * Validates phone number according to indian number format
     * @returns void
     * @param event
     */
    validatePhnNum(event: KeyboardEvent): void {
        const pattern = /[0-9\+\-\ ]/;

        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode !== 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    validFile(): any{
        const ext =
                    this.avatarImageFile.name.substring(
                        this.avatarImageFile.name.lastIndexOf('.') + 1,
                        this.avatarImageFile.name.length,
                    ) || this.avatarImageFile.name;
                const FileSize = this.avatarImageFile.size / 1024 / 1024; // in MB

                // Check valid file type
                if (
                    typeof ext === 'undefined' ||
                    ext === null ||
                    Constants.image_types_array.indexOf(ext) > -1 === false
                ) {
                    this.toastrService.error(
                        GeneralError.image_validate +
                            ' (' +
                            Constants.image_types_array +
                            ')',
                    );
                    // Check file size
                } else if (FileSize > Constants.image_size) {
                    this.toastrService.error(GeneralError.image_size_validate);
                    return false;
                } else {
                    const folderName = `admins`;

                    this._uploadService
                        .uploadFile(folderName, this.avatarImageFile)
                        .then((url: string) => {
                            if (url) {
                                if (typeof url === 'string') {
                                    this.avatarSourceUrl = this.sanitizer.bypassSecurityTrustUrl(
                                        url,
                                    );
                                    this.inputParam.user_image = url;
                                    setTimeout(() => {
                                        this._adminService
                                            .updateAdminData( this.inputParam)
                                            .then((data: string) => {
                                                if (data === 'Success') {
                                                    this.toastrService.success(
                                                        GeneralMsg.admin_update,
                                                    );
                                                    this.back();
                                                } else {
                                                    this.toastrService.error(
                                                        GeneralError.general_error_msg,
                                                    );
                                                }
                                            })
                                            .catch(err => {
                                                this.toastrService.error(
                                                    err.message,
                                                );
                                            });
                                    }, 1000);
                                } else {
                                    this.toastrService.error(
                                        GeneralError.image_upload_error,
                                    );
                                }
                            }
                        })
                        .catch(err => {
                            this.toastrService.success(err.message);
                        });
                }
    }
    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
