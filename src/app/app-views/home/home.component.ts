import { Component, OnInit } from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {BehaviorSubject, lastValueFrom, Observable, switchMap} from "rxjs";
import {filter, map} from "rxjs/operators";
import {FirefilesService} from "../../firefiles.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defi:BehaviorSubject<DefiDto[]> = new BehaviorSubject<DefiDto[]>([]);
  defisObsView:Observable<DefiDto[]>;

  constructor(private defisRest : DefiRestControllerService,private fileService : FirefilesService) {
    this.defisObsView = this.defi.pipe(
      //Le pipe magique à utiliser partous pour récupérer les urls des images
      map(defis => {
        return defis.map(async (defi) => {
          console.log(defi)
          if(defi.img) {
            return {
              ...defi,
              img: await lastValueFrom(this.fileService.getPhotoUrlObs('defis', defi.img))
            }
          }
          return {
            ...defi,
            img: '/assets/defi_picture.jpg'
          }
        });
      }),
      switchMap(async defis => {
        return await Promise.all(defis);
      }))
  }

  ngOnInit(): void {
    this.defisRest.getDefis().pipe(filter(this.isNonNull)).subscribe((v)=>{
      this.defi.next(v);
    });
  }


  isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null && typeof value !== "undefined";
  }

  get obs(){
    return this.defi.asObservable()
  }

}
