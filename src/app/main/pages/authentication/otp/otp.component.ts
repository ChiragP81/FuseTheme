import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { OTPService } from './otp.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { MetaService } from '../../../../common/services/meta.service';
import { ToasterService } from '../../../../common/services/toaster.service';
import { MetaConstant } from '../../../../../assets/config/meta';
import {
    GeneralError,
    GeneralMsg,
} from '../../../../../assets/config/webconfig';

@Component({
    selector: 'otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class OTPComponent implements OnInit, AfterViewInit {
    // Private
    otpForm: FormGroup;
    verificationId: any;
    user_data: any;
    userInfo: any;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _otpService: OTPService,
        private _router: Router,
        private _metaService: MetaService,
        private _toasterService: ToasterService,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
        this._metaService.updateTitle(MetaConstant.OTP.title);
        this._metaService.updateMetaInfo(
            MetaConstant.OTP.description,
            MetaConstant.OTP.author,
            MetaConstant.OTP.keywords,
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.otpForm = this._formBuilder.group({
            verificationCode: ['', [Validators.required]],
        });

        this.verificationId = localStorage.getItem('verificationId')
            ? localStorage.getItem('verificationId')
            : this._router.navigate(['pages/auth/login']);
    }

    ngAfterViewInit(): void {}

    /**
     * On otp Submit
     */

    onSubmit(): any {
        // stop here if form is invalid
        if (this.otpForm.invalid) {
            return;
        }

        const verificationCode = this.otpForm.value.verificationCode;
        if (this.verificationId) {
            // this.loaderService.showloader(true);
            const signInCredential = firebase.auth.PhoneAuthProvider.credential(
                this.verificationId,
                verificationCode,
            );

            return new Promise((resolve: any, reject: any) => {
                firebase
                    .auth()
                    .signInAndRetrieveDataWithCredential(signInCredential)
                    .then((credentialData: any) => {
                        if (credentialData.user.uid) {
                            const user_uid = credentialData.user.uid;
                            this._otpService
                                .userHandler(user_uid)
                                .subscribe(data => {
                                    this.user_data = data;
                                    if (
                                        typeof this.user_data !== 'undefined' &&
                                        this.user_data.length > 0
                                    ) {
                                        if (this.user_data.status === 0) {
                                            this._toasterService.error(
                                                GeneralError.inactive_account,
                                            );
                                            this._router.navigate([
                                                'pages/auth/login',
                                            ]);
                                        } else {
                                            this.user_data = this.user_data[0];
                                            if (
                                                this.user_data.user_type === 0
                                            ) {
                                                this._toasterService.error(
                                                    GeneralError.general_error_msg,
                                                );
                                                this._router.navigate(['/']);
                                            } else {
                                                this.userInfo = {
                                                    first_name: this.user_data
                                                        .first_name,
                                                    last_name: this.user_data
                                                        .last_name,
                                                    email: this.user_data.email,
                                                    isLogin: true,
                                                    user_institutes: this
                                                        .user_data.institutes,
                                                    user_type: this.user_data
                                                        .user_type,
                                                    user_uid: this.user_data
                                                        .user_uid,
                                                    user_image: this.user_data
                                                        .user_image,
                                                };
                                                localStorage.setItem(
                                                    'userInfo',
                                                    JSON.stringify(
                                                        this.userInfo,
                                                    ),
                                                );
                                                this._router.navigate([
                                                    'apps/dashboard',
                                                ]);

                                                this._toasterService.success(
                                                    GeneralMsg.login_msg,
                                                );
                                            }
                                        }
                                    } else {
                                        this._toasterService.success(
                                            GeneralError.user_notexist,
                                        );
                                        this._router.navigate([
                                            'pages/auth/login',
                                        ]);
                                    }
                                });
                        } else {
                            localStorage.removeItem('verificationId');
                            this._toasterService.error(
                                GeneralError.general_error_msg,
                            );
                            this._router.navigate(['pages/auth/login']);
                        }
                        return resolve(credentialData);
                    })
                    .catch(error => {
                        this._toasterService.success(error);
                        return reject(error);
                    });
            });
        } else {
            localStorage.removeItem('verificationId');
            this._toasterService.success(GeneralError.general_error_msg);
            this._router.navigate(['pages/auth/login']);
        }
    }
}
