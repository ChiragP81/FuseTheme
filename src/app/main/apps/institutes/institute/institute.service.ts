import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  /**
   * Constructor
   * @param _angularFire 
   */
  constructor(
    public _angularFire : AngularFirestore
  ) { }

  /**
   * Add / Update institute data
   * @param inputParam 
   * @returns Promise
   */
  addUpdateInstitute(inputParam : any) : Promise<{}>{

    return new Promise((resolve,reject) => {

      if( inputParam.institute_uid == undefined || inputParam.institute_uid == '' ){
        //console.log('create');
        this._angularFire
          .collection('/institutes/')
            .add(inputParam)
            .then((res : any) => {
                let uniquekey = res._key.path.segments[1];
                resolve(this.generateUidKey(uniquekey));
            }).catch(error => {
                reject(error);
            });

      }else{
        //console.log('update');

        this._angularFire
          .collection('/institutes/')
            .doc(inputParam.institute_uid)
            .update(inputParam)
              .then(() => {
                resolve('Success');
              }).catch(error => {
                reject(error);
              });
      }      

    });

  }

  /**
   * Update institute collection with uid as collection key while create institute
   * @param uniquekey 
   * @returns Promise
   */
  generateUidKey(uniquekey) : Promise<{}>{

    return  new Promise((resolve,reject) => {

        this._angularFire
          .collection('/institutes/')
          .doc(uniquekey)
          .update({
            institute_uid: uniquekey 
          })
          .then(res => {
            resolve('Success');
          })
          .catch(error => {
            reject(error);
          });

    });
  }

  /**
   * Get Institute of particular key from firebase collection
   * @param institute_uid : any
   * @returns Obeservable
   */
  getInstitute(institute_uid : any) : Observable<any>{
    return this._angularFire
      .collection('/institutes/' ,  ref  => ref.orderBy('created_at', 'desc') )
      .doc(institute_uid)
      .valueChanges();
  }

}
