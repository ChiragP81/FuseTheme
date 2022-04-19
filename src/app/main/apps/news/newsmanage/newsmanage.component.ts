import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    Constants,
    GeneralError,
    GeneralMsg,
    Status,
} from 'assets/config/webconfig';
import { MetaService } from 'app/common/services/meta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MetaConstant } from 'assets/config/meta';
import { ToasterService } from 'app/common/services/toaster.service';
import { NewsmanageService } from './newsmanage.service';
import { takeUntil } from 'rxjs/operators';
import { UploadDataService } from 'app/common/services/upload.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NewsType, MediaType, Institute, News } from '../news.model';
import { User } from '../../users/user.model';
@Component({
    selector: 'app-newsmanage',
    templateUrl: './newsmanage.component.html',
    styleUrls: ['./newsmanage.component.scss'],
})
export class NewsmanageComponent implements OnInit, OnDestroy {
    /**
     * Unsubscription method
     */
    private _unsubscribeAll: Subject<any>;

    // Component variables
    newsForm: FormGroup;
    public pageTitle: String = '';
    news_uid: string;
    news_type: NewsType[] = Constants.news_type;
    urlPattern: RegExp = Constants.urlPattern;
    public urlPatternError: String = GeneralError.news_url_validate;
    news_media_type: MediaType[] = Constants.news_media_type;
    imageAcceptTypes: string = ['.jpg', '.png', '.gif'].toString();
    videoAcceptTypes: string = ['.mp4'].toString();
    instituteList: Institute[] = [];
    usersList: User[] = [];
    loggedUser: any = JSON.parse(localStorage.getItem('userInfo'));
    isSuperAdmin = false;
    statusData: Status[] = Constants.news_status;
    newsMediaFiles: any;
    newsData: News;
    newsMediaSrc: any;
    public mediaInnerHtml: SafeHtml;
    loading = false; // Set to true when call service to hide submit button ; default false
    public thumbnailHtml: SafeHtml;
    public thumbnailSrc: string;
    thumbnailFile: any;
    inputParam: {
        news_title: string;
        news_description: string;
        news_type: number;
        news_url: string;
        media_type: number;
        news_media: string;
        institute_uid: string;
        user_uid: string;
        status: number;
        created_at: Date;
        updated_at: Date;
        share_count: number;
        news_uid: string;
        video_thumbnail: string;
    };
    uploadDirName: string;
    successMsg: string;

    /**
     * Constructor
     * @param {MetaService} _metaService Service to update meta tags and title
     * @param {ActivatedRoute} _activatedRoute Contains the information about a route
     * @param {FormBuilder} _fb Creates form array groups
     * @param {Router} _router Provides the navigation and url manipulation capabilities.
     * @param {ToasterService} toastrService Service to display toastr messages
     * @param {NewsmanageService} _newsService Service to access news data
     * @param {UploadDataService} _uploadService Service to upload file to clous firestorage
     * @param {DomSanitizer} _domSanitizer Sanitizes values to safe values to prevent XSS
     */
    constructor(
        private _metaService: MetaService,
        private _activatedRoute: ActivatedRoute,
        private _fb: FormBuilder,
        private _router: Router,
        private toastrService: ToasterService,
        private _newsService: NewsmanageService,
        private _uploadService: UploadDataService,
        private _domSanitizer: DomSanitizer,
    ) {
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On Init
     */
    ngOnInit(): void {
        this.news_uid = this._activatedRoute.snapshot.paramMap.get('id');

        // Check super admin user
        if (
            Number(this.loggedUser.adminType) ===
            Number(Constants.super_admin_user_type)
        ) {
            this.isSuperAdmin = true;
            this.getUsersList();
        }
        // Set form controls in form builder
        // Disable news_type,news_url,institute_uid when update
        this.newsForm = this._fb.group({
            news_title: ['', Validators.required],
            news_description: ['', Validators.required],
            news_type: this.news_uid
                ? [{ value: '', disabled: true }, [Validators.required]]
                : [{ value: '', disabled: false }, [Validators.required]],
            news_url: this.news_uid
                ? [
                      { value: '', disabled: true },
                      [Validators.pattern(this.urlPattern)],
                  ]
                : [
                      { value: '', disabled: false },
                      [Validators.pattern(this.urlPattern)],
                  ],
            media_type: [0, Validators.required],
            news_media: ['', Validators.required],
            institute_uid: this.news_uid
                ? [{ value: '', disabled: true }, [Validators.required]]
                : [{ value: '', disabled: false }, [Validators.required]],
            user_uid: this.isSuperAdmin
                ? [{ value: '', disabled: false }]
                : [
                      { value: this.loggedUser.user_uid, disabled: true },
                      [Validators.required],
                  ],
            status: [1, Validators.required],
            video_thumbnail: [''],
        });

        this.pageTitle = Constants.const_news_titles.manage_news_add;

        // Update meta tags for add
        this._metaService.updateTitle(MetaConstant.NewsAdd.title);
        this._metaService.updateMetaInfo(
            MetaConstant.NewsAdd.description,
            MetaConstant.NewsAdd.author,
            MetaConstant.NewsAdd.keywords,
        );

        this.getInstituteList();

        if (
            this.news_uid !== undefined &&
            this.news_uid !== null &&
            this.news_uid !== ''
        ) {
            this.pageTitle = Constants.const_news_titles.manage_news_edit;

            // Update meta tags for edit
            this._metaService.updateTitle(MetaConstant.NewsEdit.title);
            this._metaService.updateMetaInfo(
                MetaConstant.NewsEdit.description,
                MetaConstant.NewsEdit.author,
                MetaConstant.NewsEdit.keywords,
            );
            this.getEditNewsData(this.news_uid);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Upload News Media
     * @param mediaType i.e. 0 = Image , 1 = Video
     * @param event Upload event
     */
    uploadMedia(mediaType, files): void {
        const mediaFiles: FileList = files;
        this.newsMediaFiles = mediaFiles[0];
        this.newsForm.get('news_media').setValue('');

        if (this.newsMediaFiles !== undefined && this.newsMediaFiles !== null) {
            // console.log(this.newsMediaFiles);
            const isValidFile = this.validateFile(
                this.newsMediaFiles,
                mediaType,
            );
            if (isValidFile) {
                this.newsForm
                    .get('news_media')
                    .setValue(this.newsMediaFiles.name);
            } else {
                this.newsMediaFiles = '';
            }
        }
    }

    /**
     * Redirect to listing page
     */
    navigateToListing(): void {
        this._router.navigate(['/apps/news/newslist']);
    }

    /**
     * Submit news form
     */
    submitNewsForm(): boolean {
        const formData = this.newsForm.getRawValue();

        if (this.newsForm.valid) {
            this.successMsg = GeneralMsg.news_create;
            this.uploadDirName = 'news';
            let mediaError: String;
            if (formData.media_type === '0') {
                mediaError = GeneralError.image_validate;
            } else if (formData.media_type === '1') {
                mediaError = GeneralError.video_validate;
            }

            // Generate parameters for add / update news field
            this.inputParam = {
                news_title: formData.news_title,
                news_description: formData.news_description,
                news_type: formData.news_type,
                news_url: formData.news_url,
                media_type: formData.media_type,
                news_media: formData.news_media,
                institute_uid: formData.institute_uid,
                user_uid: formData.user_uid,
                status: formData.status,
                created_at: new Date(),
                updated_at: new Date(),
                share_count: 0,
                news_uid: '',
                video_thumbnail: formData.video_thumbnail,
            };
            if (this.newsData !== undefined && this.newsData !== null) {
                this.inputParam.created_at = this.newsData.created_at;
                this.inputParam.news_uid = this.newsData.news_uid;
                this.successMsg = GeneralMsg.news_update;
            }

            // Start validations
            if (
                (this.newsData === undefined ||
                    this.newsData.news_media === undefined ||
                    this.newsData.news_media === '') &&
                (this.newsMediaFiles === undefined ||
                    this.newsMediaFiles === null)
            ) {
                this.toastrService.error(GeneralError.no_media_validate);
                return false;
            } else if (
                this.newsMediaFiles !== undefined &&
                this.newsMediaFiles !== null
            ) {
                const isValidFile = this.validateFile(
                    this.newsMediaFiles,
                    Number(this.inputParam.media_type),
                );
                if (isValidFile) {
                    this.loading = true;

                    this._uploadService
                        .uploadFile(this.uploadDirName, this.newsMediaFiles)
                        .then((url: string) => {
                            // Get url and update in parameters
                            if (url) {
                                this.inputParam.news_media = url;
                                let callApi = false;

                                if (
                                    this.thumbnailFile !== undefined &&
                                    this.thumbnailFile !== null
                                ) {
                                    const isValidThumb = this.validateFile(
                                        this.thumbnailFile,
                                        0,
                                    );
                                    if (isValidThumb) {
                                        this.uploadValidateFile();
                                    }
                                } else {
                                    this.inputParam.video_thumbnail =
                                        this.newsData &&
                                        this.newsData.video_thumbnail !==
                                            undefined
                                            ? this.newsData.video_thumbnail
                                            : '';
                                    callApi = true;
                                }
                                if (callApi) {
                                    // Insert / update news with new media url
                                    this.updateNews();
                                }
                            } else {
                                this.toastrService.error(
                                    GeneralError.news_media_upload_err,
                                );
                                this.loading = false;
                            }
                        })
                        .catch(() => {
                            this.toastrService.error(
                                GeneralError.news_media_upload_err,
                            );
                            this.loading = false;
                        });
                } else {
                    this.toastrService.error(mediaError);
                }
            } else if (
                this.thumbnailFile !== undefined &&
                this.thumbnailFile !== null
            ) {
                const isValidThumb = this.validateFile(this.thumbnailFile, 0);
                if (isValidThumb) {
                    this.uploadValidateFile();
                }
            } else {
                this.loading = true;
                this.inputParam.news_media = this.newsData.news_media;
                this.inputParam.video_thumbnail =
                    this.newsData.video_thumbnail !== undefined
                        ? this.newsData.video_thumbnail
                        : '';
                // Insert / update news with existing media
                this.updateNews();
            }
        }
    }

    /**
     * Get institute listing
     */
    getInstituteList(): void {
        this._newsService
            .getInstitutes()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: Institute[]) => {
                    this.instituteList = data;
                },
                error => {
                    this.toastrService.error(error.message);
                },
            );
    }

    /**
     * Get users listing
     */
    getUsersList(): void {
        this._newsService
            .getUsers()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: User[]) => {
                    this.usersList = data;
                },
                error => {
                    this.toastrService.error(error.message);
                },
            );
    }

    /**
     * Check selected file valid or not
     * @param newsMediaFiles Selected file
     * @param mediaType 0 = Image , 1 = Video
     * @returns boolean
     */
    validateFile(newsMediaFiles, mediaTypeStr: string | number): boolean {
        const ext =
            newsMediaFiles.name.substring(
                newsMediaFiles.name.lastIndexOf('.') + 1,
                newsMediaFiles.name.length,
            ) || newsMediaFiles.name;
        const mediaType = Number(mediaTypeStr);

        const FileSize = newsMediaFiles.size / 1024 / 1024; // in MB
        // console.log(FileSize)
        let validMediaSize, mediaSizeError, validMediaType, mediaTypeError;
        if (mediaType === 0) {
            validMediaSize = Constants.image_size;
            mediaSizeError = GeneralError.image_size_validate;
            validMediaType = Constants.image_types_array;
            mediaTypeError = GeneralError.image_validate;
        } else if (mediaType === 1) {
            validMediaSize = Constants.video_size;
            mediaSizeError = GeneralError.video_size_validate;
            validMediaType = Constants.video_types_array;
            mediaTypeError = GeneralError.video_validate;
        }

        // Check media file size
        if (FileSize > validMediaSize) {
            this.toastrService.error(mediaSizeError);
            return false;

            // Check valid media type
        } else if (
            typeof ext === 'undefined' ||
            ext === null ||
            validMediaType.indexOf(ext) > -1 === false
        ) {
            this.toastrService.error(
                mediaTypeError + ' (' + validMediaType + ')',
            );
            return false;
        }

        return true;
    }

    /**
     * Get news data of selected news_uid for edit
     * @param news_uid
     */
    getEditNewsData(news_uid): void {
        this._newsService
            .getNewsData(news_uid)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (data: News) => {
                    if (data !== undefined && data !== null) {
                        this.newsData = data;
                        this.renderEditData(data);
                    } else {
                        this.toastrService.error(GeneralError.news_notexist);
                        setTimeout(() => {
                            this.navigateToListing();
                        }, 1000);
                    }
                },
                () => {
                    this.toastrService.error(GeneralError.news_notexist);
                    setTimeout(() => {
                        this.navigateToListing();
                    }, 1000);
                },
            );
    }

    /**
     * Set form data for update
     * @param data
     */
    renderEditData(data: News): void {
        this.newsForm.setValue({
            news_title: data.news_title,
            news_description: data.news_description,
            news_type: data.news_type,
            news_url: data.news_url,
            media_type: data.media_type,
            news_media: data.news_media,
            institute_uid: data.institute_uid,
            user_uid: data.user_uid,
            status: data.status,
            video_thumbnail: data.media_type === 1 ? data.video_thumbnail : '',
        });
        this.newsMediaSrc = data.news_media;
        this.setInnerHtml(this.newsMediaSrc, this.mediaInnerHtml);
        if (data.media_type === 1) {
            this.thumbnailSrc = data.video_thumbnail;
            this.setInnerHtml(this.thumbnailSrc, this.thumbnailHtml);
        }
    }

    /**
     * Change news_media when update
     * @param event
     */
    changeMediaValue(mediaValue: number): void {
        if (this.newsData !== undefined && this.newsData !== null) {
            // console.log(mediaValue);
            if (this.newsData.media_type !== mediaValue) {
                this.newsMediaSrc = '';
                this.setInnerHtml(this.newsMediaSrc, this.mediaInnerHtml);
                this.newsForm.get('news_media').setValue('');
                if (this.newsData.media_type === 1) {
                    this.thumbnailSrc = '';
                    this.setInnerHtml(this.thumbnailSrc, this.thumbnailHtml);
                    this.newsForm.get('video_thumbnail').setValue('');
                }
            } else {
                this.newsMediaSrc = this.newsData.news_media;
                this.setInnerHtml(this.newsMediaSrc, this.mediaInnerHtml);
                this.newsForm
                    .get('news_media')
                    .setValue(this.newsData.news_media);
                if (this.newsData.media_type === 1) {
                    this.thumbnailSrc = this.newsData.video_thumbnail;
                    this.setInnerHtml(this.thumbnailSrc, this.thumbnailHtml);
                    this.newsForm
                        .get('video_thumbnail')
                        .setValue(this.newsData.video_thumbnail);
                }
            }
        } else {
            this.newsMediaSrc = '';
            this.setInnerHtml(this.newsMediaSrc, this.mediaInnerHtml);
            this.newsForm.get('news_media').setValue('');
            this.thumbnailSrc = '';
            this.setInnerHtml(this.thumbnailSrc, this.thumbnailHtml);
            this.newsForm.get('video_thumbnail').setValue('');
        }
    }

    /**
     * Set safe url in object for media image / video
     * @param url
     */
    public setInnerHtml(url: string, htmlEle): void {
        // tslint:disable-next-line: prefer-const
        let height = '100px',
            width = '250px';
        if (this.newsData !== undefined && this.newsData.media_type === 0) {
            width = '150px;';
        }

        const htmlObj = this._domSanitizer.bypassSecurityTrustHtml(
            `<object data='${url}' class="embed-responsive-item" width="${width}" height="${height}">
            Url ${url} failed 
            </object>`,
        );

        if (htmlEle === this.mediaInnerHtml) {
            this.mediaInnerHtml = htmlObj;
        } else {
            this.thumbnailHtml = htmlObj;
        }
    }

    /**
     * Upload News Media
     * @param event Upload event
     */
    uploadVideoThumbnail(files: FileList): void {
        this.thumbnailFile = files[0];
        this.newsForm.get('video_thumbnail').setValue('');

        if (this.thumbnailFile !== undefined && this.thumbnailFile !== null) {
            const isValidFile = this.validateFile(this.thumbnailFile, 0);
            if (isValidFile) {
                this.newsForm
                    .get('video_thumbnail')
                    .setValue(this.thumbnailFile.name);
            } else {
                this.thumbnailFile = '';
            }
        }
    }

    /**
     * upload file
     */

    uploadValidateFile(): void {
        this._uploadService
            .uploadFile(this.uploadDirName, this.thumbnailFile)
            .then((thumbUrl: string) => {
                if (thumbUrl) {
                    this.inputParam.video_thumbnail = thumbUrl;
                    this.updateNews();
                } else {
                    this.toastrService.error(
                        GeneralError.news_thumb_upload_err,
                    );
                    this.loading = false;
                }
            })
            .catch(() => {
                this.toastrService.error(GeneralError.news_thumb_upload_err);
                this.loading = false;
            });
    }

    /**
     * Insert / update news with existing media
     */
    updateNews(): void {
        this._newsService
            .addUpdateNews(this.inputParam)
            .then(data => {
                if (data) {
                    this.toastrService.success(this.successMsg);
                    this.navigateToListing();
                }
            })
            .catch(() => {
                this.toastrService.error(GeneralError.general_error_msg);
                this.loading = false; // Set false => error
            });
    }

    /**
     * On Destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe with subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
