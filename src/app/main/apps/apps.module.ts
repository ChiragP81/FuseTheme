import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import {
    AuthGuardService,
    SuperAdminGuardService,
} from '../../common/services/auth-guard.service';

const routes = [
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuardService],
    },
    {
        path: 'admins',
        children: [
            { path: '', redirectTo: 'adminlist' },
            {
                path: 'adminlist',
                loadChildren:
                    './admins/adminlist/adminlist.module#AdminlistModule',
            },
            {
                path: 'admin/:id',
                loadChildren: './admins/admin/admin.module#AdminModule',
            },
        ],
        canActivate: [AuthGuardService, SuperAdminGuardService],
    },
    {
        path: 'users',
        children: [
            {
                path: '',
                redirectTo: 'userlist',
            },
            {
                path: 'userlist',
                loadChildren: './users/userlist/userlist.module#UserlistModule',
            },
            {
                path: 'user/:id',
                loadChildren: './users/user/user.module#UserModule',
            },
        ],
        canActivate: [AuthGuardService, SuperAdminGuardService],
    },
    {
        path: 'institutes',
        children: [
            {
                path: '',
                redirectTo: 'institutelist',
            },
            {
                path: 'institutelist',
                loadChildren:
                    './institutes/institutelist/institutelist.module#InstitutelistModule',
            },
            {
                path: 'institute',
                loadChildren:
                    './institutes/institute/institute.module#InstituteModule',
            },
            {
                path: ':id/edit',
                loadChildren:
                    './institutes/institute/institute.module#InstituteModule',
            },
            {
                path: ':id/instituterole',
                loadChildren:
                    './institutes/instituterole/instituterole.module#InstituteroleModule',
            },
            {
                path: 'instituterequest',
                loadChildren:
                    './institutes/instituterequest/instituterequest.module#InstituterequestModule',
            },
        ],
        canActivate: [AuthGuardService, SuperAdminGuardService],
    },
    {
        path: 'news',
        children: [
            {
                path: '',
                redirectTo: 'newslist',
            },
            {
                path: 'newslist',
                loadChildren: './news/newslist/newslist.module#NewslistModule',
            },
            {
                path: 'add',
                loadChildren:
                    './news/newsmanage/newsmanage.module#NewsmanageModule',
            },
            {
                path: ':id/edit',
                loadChildren:
                    './news/newsmanage/newsmanage.module#NewsmanageModule',
            },
        ],
        canActivate: [AuthGuardService, SuperAdminGuardService],
    },
    {
        path: 'trivias',
        children: [
            { path: '', redirectTo: 'trivialist' },
            {
                path: 'trivialist',
                loadChildren:
                    './trivias/trivialist/trivialist.module#TrivialistModule',
            },
            {
                path: 'trivia',
                loadChildren: './trivias/trivia/trivia.module#TriviaModule',
            },
        ],
        canActivate: [AuthGuardService, SuperAdminGuardService],
    },
    {
        path: 'adverts',
        children: [
            { path: '', redirectTo: 'advertlist' },
            {
                path: 'advertlist',
                loadChildren:
                    './adverts/advertlist/advertlist.module#AdvertlistModule',
            },
            {
                path: 'advert',
                loadChildren: './adverts/advert/advert.module#AdvertModule',
            },
            {
                path: 'advert/:id',
                loadChildren: './adverts/advert/advert.module#AdvertModule',
            },
        ],
        canActivate: [AuthGuardService, SuperAdminGuardService],
    },
    {
        path: 'event',
        children: [
            {
                path: '',
                redirectTo: 'eventlist',
            },
            {
                path: 'eventlist',
                loadChildren:
                    './event/eventlist/eventlist.module#EventlistModule',
            },
            {
                path: 'event/:id',
                loadChildren: './event/event/event.module#EventModule',
            },
        ],
        canActivate: [AuthGuardService, SuperAdminGuardService],
    },
    {
        path: 'txclusive',
        children: [
            {
                path: '',
                redirectTo: 'txclusivelist',
            },
            {
                path: 'txclusivelist',
                loadChildren:
                    './txclusive/txclusivelist/txclusivelist.module#TxclusivelistModule',
            },
            {
                path: 'txclusive/:id',
                loadChildren:
                    './txclusive/txclusive/txclusive.module#TxclusiveModule',
            },
        ],
        canActivate: [AuthGuardService, SuperAdminGuardService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), FuseSharedModule],
    declarations: [],
    providers: [AuthGuardService, SuperAdminGuardService],
})
export class AppsModule {}
