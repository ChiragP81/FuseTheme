import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
} from '@angular/material';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule
} from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ServiceWorkerModule } from '@angular/service-worker';
import { PwaService } from './common/services/pwa.service';


const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path: '**',
        redirectTo: 'apps/dashboard'
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        AngularFireModule.initializeApp(environment.firebaseConfig),

        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        // imports firebase/storage only needed for storage features

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        }),
    ],
    bootstrap: [AppComponent],
    providers: [PwaService]
})
export class AppModule {}
