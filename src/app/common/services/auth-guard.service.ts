import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { GeneralError, Constants } from '../../../assets/config/webconfig';
import { ToasterService } from '../../common/services/toaster.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router) {}
    canActivate(): any {
        if (localStorage.getItem('userInfo')) {
            return true;
        }
        this.router.navigate(['/pages/auth/login']);
        return false;
    }
}

@Injectable()
export class LoginGuardService implements CanActivate {
    constructor(private router: Router) {}
    canActivate(): any {
        if (!localStorage.getItem('userInfo')) {
            return true;
        }
        this.router.navigate(['/apps/dashboards/project']);
        return false;
    }
}

@Injectable()
export class SuperAdminGuardService implements CanActivate {
    userInfo: any = [];
    constructor(private router: Router, private toastrService: ToasterService) {
        if (localStorage.getItem('userInfo')) {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        } else {
            this.router.navigate(['/']);
        }
    }
    canActivate(): any {
        if (
            Number(this.userInfo.user_type) !== Constants.super_admin_user_type
        ) {
            this.router.navigate(['/']);
            this.toastrService.error(GeneralError.no_permission);
            return false;
        }
        return true;
    }
}
