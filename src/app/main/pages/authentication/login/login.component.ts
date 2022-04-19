import {
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as firebase from 'firebase';

import { Router } from '@angular/router';

import { MetaService } from '../../../../common/services/meta.service';
import { MetaConstant } from '../../../../../assets/config/meta';

export interface Country {
    id: any;
    name: any;
}

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    private autocompleteSelectionValidator(control: FormControl) {
        let selection = control.value;
        if (typeof selection === 'string') {
            return { incorrect: {} };
        }
        return null;
    }

    loginForm: FormGroup;
    submitted = false;
    displaybtn = true;
    recaptchaVerifier: any = '';
    country_data: Country[];
    countryfilteredOptions: Observable<Country[]>;
    countryCode: any;
    countryfilterValue;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
        private _router: Router,
        private _metaService: MetaService,
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
        this._metaService.updateTitle(MetaConstant.Login.title);
        this._metaService.updateMetaInfo(
            MetaConstant.Login.description,
            MetaConstant.Login.author,
            MetaConstant.Login.keywords,
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            phone: ['', [Validators.required]],
            countrycode: [
                '',
                [Validators.required, this.autocompleteSelectionValidator],
            ],
        });
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            'recaptcha-container',
        );
    }

    ngAfterViewInit(): void {
        this.getCountry();
    }

    /**
     * getCountry
     */

    getCountry(): any {
        return this._loginService.getCountry().subscribe(doc => {
            this.country_data = doc;
            this.textChangeOperation();
        });
    }

    textChangeOperation(): any {
        this.countryfilteredOptions = this.loginForm.controls.countrycode.valueChanges.pipe(
            startWith<any | Country>(''),
            map(value => (typeof value === 'string' ? value : value.name)),
            map(name =>
                name ? this.countryfilter(name) : this.country_data.slice(),
            ),
        );

        // console.log('countrydatafilter', this.countryfilteredOptions);
    }

    countryDisplayFn(countryData?: Country): string | undefined {
        return countryData ? countryData.name : undefined;
    }

    countryfilter(countrydatafilter: any): Country[] {
        // console.log('ter', countrydatafilter);
        let countryfilterValue = countrydatafilter.toLowerCase();
        this.countryCode = countryfilterValue;

        return this.country_data.filter(
            option =>
                option.id.toLowerCase().indexOf(countryfilterValue) === 0 ||
                option.name.toLowerCase().indexOf(countryfilterValue) === 0,
        );
    }

    /**
     * On login Submit
     */

    onSubmit(): void {
        this.submitted = true;
        this.displaybtn = false;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        const phoneNumber =
            '+' +
            this.loginForm.value.countrycode.phonecode +
            this.loginForm.value.phone;
        this._loginService
            .login(phoneNumber, this.recaptchaVerifier)
            .then((verificationId: any) => {
                // console.log(
                //     'verificationIdverificationIdverificationId',
                //     verificationId,
                // );
                localStorage.setItem('verificationId', verificationId);
                this._router.navigate(['pages/auth/otp']);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
    }
}
