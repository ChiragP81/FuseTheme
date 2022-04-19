import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Upload } from './upload.model';
import { GeneralError } from 'assets/config/webconfig';
import {
    AngularFireStorage,
    AngularFireUploadTask,
    AngularFireStorageReference,
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UploadDataService {
    private basePath = '/uploads';
    constructor(
        public angularfire: AngularFirestore,
        public fireStorage: AngularFireStorage,
    ) {}

    public saveFileData(array, currentUpload, dirName): any {
        return new Promise(resolve => {
            this.pushUpload(currentUpload, '/' + dirName).then(response => {
                array.Logo = response;
                resolve(array);
            });
        });
    }

    pushUpload(upload: Upload, path: any): any {
        return new Promise(resolve => {
            const storageRef = firebase.storage().ref();
            const uploadTask = storageRef
                .child(`${this.basePath}/${path}/${upload.file.name}`)
                .put(upload.file);
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    upload.progress =
                        (uploadTask.snapshot.bytesTransferred /
                            uploadTask.snapshot.totalBytes) *
                        100;
                },
                error => {
                    console.log(error);
                },
                () => {
                    upload.url = uploadTask.snapshot.downloadURL;
                    upload.name = upload.file.name;
                    resolve(uploadTask.snapshot.downloadURL);
                },
            );
        });
    }

    /**
     * Uploads file in specified firebase storage path.
     * @param folder  Folder name in which image is to be uploaded
     * @param selectedImage  Image which is to be uploaded
     * @returns Downloaded url of file
     */
    public uploadFile(folder: string, selectedImage: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            if (
                selectedImage === undefined ||
                selectedImage === null ||
                selectedImage.length === 0
            ) {
                reject(GeneralError.no_image_validate);
            }
            const Imgpath = `${this.basePath}/${folder}/${selectedImage.name}`;
            const ref: AngularFireStorageReference = this.fireStorage.ref(
                Imgpath,
            );
            const task: AngularFireUploadTask = ref.put(selectedImage);
            task.snapshotChanges()
                .pipe(
                    finalize(() => {
                        const downloadURL: Observable<
                            any
                        > = ref.getDownloadURL();
                        downloadURL.subscribe(
                            url => {
                                resolve(url);
                            },
                            error => {
                                reject(error);
                            },
                        );
                    }),
                )
                .subscribe();
        });
    }
}
