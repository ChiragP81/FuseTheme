import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { OTPModule } from 'app/main/pages/authentication/otp/otp.module';

@NgModule({
    imports: [LoginModule, OTPModule]
})
export class PagesModule {}
