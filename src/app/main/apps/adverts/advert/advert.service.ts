import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Upload } from '../../../../common/services/upload.model';

@Injectable()
export class AdvertService {
    private basePath = '/uploads';
    constructor(public angularfire: AngularFirestore) {}

    public addBannerData(inputparam, banner_image): any {
       return new Promise(_resolve => {
            this.angularfire
                .collection('/banners/')
                .add({
                    banner_title: inputparam.banner_title,
                    banner_link: inputparam.banner_link,
                    banner_order: inputparam.banner_order,
                    banner_status: inputparam.banner_status,
                    created_at: new Date(),
                    updated_at: new Date(),
                    banner_image: banner_image,
                })
                .then(res => {
                    const result: any = res;
                    const key = result._key.path.segments[1];
                    this.insertKey(key);
                })
                .catch(error => {
                    console.log('failed', error);
                });
        });
    }

    insertKey(key): void{
        this.angularfire
            .collection('/banners/')
            .doc(key)
            .update({
                banner_uid: key,
            })
            .then(_res => {
                console.log('successs');
            })
            .catch(error => {
                console.log('failed', error);
            });
    }
    getAdvert(banner_uid): any{
        return this.angularfire
            .collection('/banners/')
            .doc(banner_uid)
            .valueChanges();
    }

    public updateBanner(inputparam, banner_image, banner_uid = null): void{
        if (banner_uid) {
            this.updateAdvert(inputparam, banner_image, banner_uid);
        } else {
            this.addBannerData(inputparam, banner_image);
        }
    }

    public updateAdvert(inputparam, banner_image, banner_uid): void{
        this.angularfire
            .collection('/banners/')
            .doc(banner_uid)
            .update({
                banner_link: inputparam.banner_link,
                banner_order: inputparam.banner_order,
                banner_status: Number(inputparam.banner_status),
                banner_title: inputparam.banner_title,
                updated_at: new Date(),
                banner_image: banner_image,
            })
            .then(() => {
                console.log('successs');
            })
            .catch(_error => {
                console.log('failed');
            });
    }

    pushFileData(currentUpload, inputparam, banner_uid = null): any{
        return new Promise(resolve => {
            this.pushUpload(currentUpload, '/banners').then(respimg => {
                this.updateBanner(inputparam, respimg, banner_uid);
                resolve(respimg);
            });
        });
    }

    saveFileData(array, currentUpload): any{
        return new Promise(resolve => {
            this.pushUpload(currentUpload, '/banners').then(respimg => {
                array.banner_image = respimg;
                resolve(array);
            });
        });
    }
    pushUpload(upload: Upload, path: any): any{
        return new Promise(resolve => {
            const storageRef = firebase.storage().ref();
            const uploadTask = storageRef
                .child(`${this.basePath}/${path}/${upload.file.name}`)
                .put(upload.file);
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                _snapshot => {
                    upload.progress =
                        (uploadTask.snapshot.bytesTransferred /
                            uploadTask.snapshot.totalBytes) *
                        100;
                },
                error => {
                    console.log('error', error);
                },
                () => {
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(function(downloadURL) {
                            resolve(downloadURL);
                        });
                    // upload.url = uploadTask.snapshot.downloadURL;
                    upload.name = upload.file.name;
                },
            );
        });
    }
}
