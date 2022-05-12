import { Component, OnInit } from '@angular/core';
import {DefiDto} from "../../apis/api-local/models/defi-dto";
import {DefiRestControllerService} from "../../apis/api-local/services/defi-rest-controller.service";
import {BehaviorSubject,  filter, map,lastValueFrom, Observable, switchMap} from "rxjs";
import {FirefilesService} from "../../services/firefiles.service";
import {TagCount} from "../../apis/api-local/models/tag-count";
import {VisiteDto} from "../../apis/api-local/models/visite-dto";
import {UserService} from "../../services/user.service";
import {GameRestControllerService} from "../../apis/api-local/services/game-rest-controller.service";
import {ChamisCount} from "../../apis/api-local/models/chamis-count";

@Component({


  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defi:BehaviorSubject<DefiDto[]> = new BehaviorSubject<DefiDto[]>([]);
  defisObsView:Observable<DefiDto[]>;
  visiteur:BehaviorSubject<VisiteDto[]> = new BehaviorSubject<VisiteDto[]>([]);
  tagsObs : Observable<TagCount[]>;
  tagsTab? : TagCount[];
  defisNbChamis = new BehaviorSubject<ChamisCount[]>([]);
  userId: number=-1;
  constructor(private defisRest : DefiRestControllerService,
              private fileService : FirefilesService,
              public auth : UserService,
              private gameRest: GameRestControllerService) {
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
      }));
    this.tagsObs = defisRest.getTagCount();
    this.tagsObs.subscribe((v)=>{this.tagsTab = v;});
    this.update();
    this.visiteur.subscribe((v)=>{console.log('visiteur',v)});
  }

  ngOnInit(): void {
    this.defisRest.getDefis().pipe(filter(this.isNonNull)).subscribe((v)=>{
      this.defi.next(v);
    });
  }

  update(){
    this.auth.getUserId().subscribe(async (id) => {
      const visites = await lastValueFrom(this.gameRest.getVisiteByUserIdStatus({id, status: 'ENCOURS'})
        .pipe(
          //Le pipe magique à utiliser partous pour récupérer les urls des images
          map(visites => {
            return visites.map(async (visite) => {
              console.log(visite)
              if (visite.defi!.img) {
                return {
                  ...visite,
                  defi: {
                    ...visite.defi,
                    img: await lastValueFrom(this.fileService.getPhotoUrlObs('defis', visite.defi!.img))
                  }
                }
              }
              return {
                ...visite,
                defi: {
                  ...visite.defi,
                  img: '/assets/defi_picture.jpg'
                }
              }
            });
          }),

          switchMap(async visites => {
            return await Promise.all(visites);
          })));
      console.log('aaaaaaaaaaaa',visites);
      this.visiteur.next(visites);
    });
  }

  getvisiteObsView() : Observable<VisiteDto[]> {
      return this.visiteur.asObservable();
  }

  isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null && typeof value !== "undefined";
  }

  get obs(){
    return this.defi.asObservable()
  }

}
