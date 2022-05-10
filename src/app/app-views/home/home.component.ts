import { Component, OnInit } from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {BehaviorSubject,  filter, map,lastValueFrom, Observable, switchMap} from "rxjs";
import {FirefilesService} from "../../firefiles.service";
import {TagCount} from "../../api/models/tag-count";

@Component({


  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defi:BehaviorSubject<DefiDto[]> = new BehaviorSubject<DefiDto[]>([]);
  defisObsView:Observable<DefiDto[]>;
  tagsObs : Observable<TagCount[]>;
  tagsTab? : TagCount[];

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
    this.tagsObs = defisRest.getTagCount();
    this.tagsObs.subscribe((v)=>{this.tagsTab = v;});
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
