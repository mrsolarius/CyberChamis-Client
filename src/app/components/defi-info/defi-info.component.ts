import {Component, OnInit} from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, firstValueFrom, lastValueFrom, Observable, switchMap} from "rxjs";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {CommentaireDto} from "../../api/models/commentaire-dto";
import {CommentaireRestControllerService} from "../../api/services/commentaire-rest-controller.service";
import {NoteRestControllerService} from "../../api/services/note-rest-controller.service";
import {RatingDefiDto} from "../../api/models/rating-defi-dto";
import {FirefilesService} from "../../firefiles.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-defi-info',
  templateUrl: './defi-info.component.html',
  styleUrls: ['./defi-info.component.scss']
})
export class DefiInfoComponent implements OnInit {

  obsDefi = new BehaviorSubject<DefiDto>({});
  viewObsDefi: Observable<DefiDto> = new BehaviorSubject<DefiDto>({});
  obsCom = new BehaviorSubject<CommentaireDto[]>([]);
  obsRating = new BehaviorSubject<RatingDefiDto>({});


  constructor(private route: ActivatedRoute,
              private defiRestControllerService : DefiRestControllerService,
              private noteRestComponent : NoteRestControllerService,
              private comentaireService : CommentaireRestControllerService,
              private fileService : FirefilesService) {
    this.viewObsDefi = this.obsDefi.pipe(
      map(async defi => {
        return {
          ...defi,
          img: await lastValueFrom(this.fileService.getPhotoUrlObs('defis',defi.img===undefined?'':defi.img))
        }
      }),
      switchMap(async defi => {
        return await defi;
      })
    );

    this.obsDefi.subscribe(async value => {
      if(value.id) {
        const val = await lastValueFrom(this.comentaireService.getCommentaires({defiId: value.id}))
        this.obsCom.next(val);
        const rating = await lastValueFrom(this.noteRestComponent.getNbByValue({defiId:value.id}))
        this.obsRating.next(rating)
      }
    })
  }

  async loadDefi() {
    const param = await firstValueFrom(this.route.params)
    const id = param['id'];
    const defi = await lastValueFrom(this.defiRestControllerService.getById({id}));
    if (defi)
      this.obsDefi.next(defi);
  }

  ngOnInit(): void {
    this.loadDefi();
  }

  checkIfNote(defi: DefiDto) {
    return !isNaN(defi.noteMoyenne!);
  }

  apendNewComment($event: CommentaireDto) {
    this.obsCom.next([...this.obsCom.value, $event]);
  }

  getFile(defi: DefiDto) {
    console.log('defi/',defi.img)
    if (defi.img) return this.fileService.getPhotoUrlObs('defi',defi.img);
    else return new Observable<string>((observer) => observer.next(''));
  }
}
