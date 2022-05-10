import { Injectable } from '@angular/core';
import {v4 as uuid} from "uuid";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {lastValueFrom, Observable} from "rxjs";
import {compress, EImageType} from 'image-conversion';
@Injectable({
  providedIn: 'root'
})
export class FirefilesService {

  constructor(private storage:AngularFireStorage) { }

  savePhoto(file: File|Blob,databaseKey:string): Promise<string> {
    return new Promise((resolve, reject) => {
      const id = uuid();
      // upload the file to firebase storage with the id as the name
      this.storage.upload(databaseKey + '/' + id, file).then(() => {
        resolve(id);
      }).catch(reject);
    });
  }

  getPhotoUrl(databaseKey:string,id: string): Promise<string> {
    return lastValueFrom(this.storage.ref('/'+databaseKey + '/' + id).getDownloadURL());
  }

  getPhotoUrlObs(databaseKey:string,id: string): Observable<string> {
    this.storage.ref('/'+databaseKey + '/' + id).getDownloadURL().subscribe(url => {
      console.log('url',url);
    })
    return this.storage.ref('/'+databaseKey + '/' + id).getDownloadURL();
  }

  compressImg(file: File): Promise<Blob> {
    return compress(file, {
      quality:0.9,
      height:800,
      type: EImageType.PNG
    })
  }
}
