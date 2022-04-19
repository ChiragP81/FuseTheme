import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AdvertListService {
    constructor(public angularfire: AngularFirestore) {
    }
    getBanner(): any {
        return this.angularfire
            .collection('/banners/', ref => ref.orderBy('created_at', 'desc'))
            .valueChanges();
    }
    removeBanner(banner_uid): any {
        this.angularfire
            .collection('/banners/')
            .doc(banner_uid)
            .delete();
    }
}
