import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'app/common/services/toaster.service';
import {
    Constants,
    GeneralMsg,
    GeneralError,
    Status,
} from '../../../../../assets/config/webconfig';
import { AngularFireAuth } from '@angular/fire/auth';
import { MetaService } from '../../../../common/services/meta.service';
import { MetaConstant } from '../../../../../assets/config/meta';
import { AdvertService } from './advert.service';
import { Upload } from '../../../../common/services/upload.model';

@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss'],
})
export class AdvertComponent implements OnInit, OnDestroy {
    urlPattern = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    urlPatternerror = GeneralError.weburl_validate;
    advertForm: FormGroup;
    selectedFiles: any;
    files: FileList;
    pageTitle: any = Constants.const_affiliate_ad.Create_Affiliate_Advert;
    status: Status[] = Constants.status;
    avatarImageFile: any = [];
    imageAcceptTypes = ['.jpeg', '.jpg', '.png', '.gif'].toString();
    advertEditImage: any;
    private advert_data: any;
    current_advert_uid = '';
    current_advert_type: number;
    banner_uid: string;
    avatarSourceUrl: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        public router: Router,
        private toaster: ToasterService,
        private advertformService: AdvertService,
        public afAuth: AngularFireAuth,
        private activatedRoute: ActivatedRoute,
        private _metaService: MetaService,
    ) {
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.advertForm = this._formBuilder.group({
            banner_title: ['', Validators.required],
            banner_link: [
                '',
                [Validators.required, Validators.pattern(this.urlPattern)],
            ],
            banner_image: [''],
            banner_order: ['', [Validators.required, Validators.min(1)]],
            banner_status: ['', [Validators.required, Validators.min(0)]],
        });
        this.banner_uid = this.activatedRoute.snapshot.paramMap.get('id');
    }

     /**
     * After view init.
     * Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
     */
    ngAfterContentInit(): void {
        if (this.banner_uid) {
            this.pageTitle = MetaConstant.AdvertEdit.title;
            this._metaService.updateTitle(this.pageTitle);
            this._metaService.updateMetaInfo(
                MetaConstant.AdvertEdit.description,
                MetaConstant.AdvertEdit.author,
                MetaConstant.AdvertEdit.keywords,
            );
            this.editFormHandler();
        } else {
            this.pageTitle = MetaConstant.AdvertAdd.title;
            this._metaService.updateTitle(this.pageTitle);
            this._metaService.updateMetaInfo(
                MetaConstant.AdvertAdd.description,
                MetaConstant.AdvertAdd.author,
                MetaConstant.AdvertAdd.keywords,
            );
        }
    }
    
    cancelHandler(): void {
        // this.advertForm.reset();
        this.router.navigate(['/apps/adverts/advertlist']);
    }
    editFormHandler(): void {
        this.advertformService.getAdvert(this.banner_uid).subscribe(data => {
            this.advert_data = data;
            if (this.advert_data === null || this.advert_data.length === 0) {
                this.router.navigate(['apps/adverts/advertlist']);
            } else if (
                this.current_advert_type === 0 &&
                this.current_advert_uid !== this.advert_data['advert_uid']
            ) {
                this.router.navigate(['apps/adverts/advertlist']);
            } else {
                this.advertEditImage = this.advert_data.banner_image;
                this.advertForm.controls['banner_title'].setValue(
                    this.advert_data.banner_title,
                );
                this.advertForm.controls['banner_link'].setValue(
                    this.advert_data.banner_link,
                );
                this.advertForm.controls['banner_image'].setValue(null);
                this.advertForm.controls['banner_order'].setValue(
                    this.advert_data.banner_order,
                );
                this.advertForm.controls['banner_status'].setValue(
                    String(this.advert_data.banner_status),
                );
                this.avatarSourceUrl = this.advert_data.banner_image;
            }
        });
    }
    onChange(event): any {
        const fileList: FileList = event.target.files;
        this.avatarImageFile = fileList[0];
        this.files = event.target.files;
        this.selectedFiles = this.files[0];
        const FileSize = this.selectedFiles.size / 1024 / 1024; // in MB
        if (FileSize > Constants.image_size) {
            this.toaster.error(GeneralError.image_size_validate);
            return false;
        }
    }
    submitHandler(): any {
        if (this.advertForm.valid) {
            if (this.banner_uid === null) {
                if (
                    typeof this.selectedFiles === 'undefined' ||
                    this.selectedFiles === null
                ) {
                    this.toaster.error(GeneralError.no_image_validate);
                    return false;
                }
            } else {
                const inputparam = this.advertForm.value;
                inputparam.banner_status = inputparam.banner_status;
                this.advertformService.updateAdvert(
                    inputparam,
                    this.advertEditImage,
                    this.banner_uid,
                );
                this.toaster.success(GeneralMsg.banner_update);
                this.router.navigate(['/apps/adverts/advertlist']);
            }
            if (
                typeof this.selectedFiles !== 'undefined' &&
                this.selectedFiles !== null
            ) {
                this.checkExtension();
                this.checkSize();
                this.avatarSubmit();
            }
        }
    }
    avatarSubmit(): any {
        this.selectedFiles = new Upload(this.selectedFiles);
        const inputparam = this.advertForm.value;
        this.advertformService
            .pushFileData(this.selectedFiles, inputparam, this.banner_uid)
            .then(resp => {
                this.advertEditImage = resp;
                this.toaster.success(GeneralMsg.banner_create);
                this.router.navigate(['/apps/adverts/advertlist']);
            });
    }
    checkExtension(): any {
        const ext =
            this.selectedFiles.name.substring(
                this.selectedFiles.name.lastIndexOf('.') + 1,
                this.selectedFiles.name.length,
            ) || this.selectedFiles.name;
        if (
            typeof ext === 'undefined' ||
            ext === null ||
            Constants.image_types_array.indexOf(ext) > -1 === false
        ) {
            this.toaster.error(
                GeneralError.image_validate +
                    '(' +
                    Constants.image_types_array +
                    ')',
            );
            return false;
        }
    }
    checkSize(): any {
        if (
            typeof this.selectedFiles !== 'undefined' &&
            this.selectedFiles != null
        ) {
            const FileSize = this.selectedFiles.size / 1024 / 1024; // in MB
            if (FileSize > Constants.image_size) {
                this.toaster.error(GeneralError.image_size_validate);
                return false;
            }
        }
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
