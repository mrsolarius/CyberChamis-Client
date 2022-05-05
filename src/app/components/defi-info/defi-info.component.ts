import {Component, OnInit} from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, firstValueFrom, lastValueFrom} from "rxjs";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {CommentaireDto} from "../../api/models/commentaire-dto";
import {CommentaireRestControllerService} from "../../api/services/commentaire-rest-controller.service";
import {NoteRestControllerService} from "../../api/services/note-rest-controller.service";
import {RatingDefiDto} from "../../api/models/rating-defi-dto";

@Component({
  selector: 'app-defi-info',
  templateUrl: './defi-info.component.html',
  styleUrls: ['./defi-info.component.scss']
})
export class DefiInfoComponent implements OnInit {

  obsDefi = new BehaviorSubject<DefiDto>({});
  obsCom = new BehaviorSubject<CommentaireDto[]>([]);
  obsRating = new BehaviorSubject<RatingDefiDto>({});


  constructor(private route: ActivatedRoute,
              private defiRestControllerService : DefiRestControllerService,
              private noteRestComponent : NoteRestControllerService,
              private comentaireService : CommentaireRestControllerService) {
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
    console.log("onload : ",defi)
    if (defi)
      this.obsDefi.next(defi);
  }

  ngOnInit(): void {
    this.loadDefi();
  }

  getTitre(defi: DefiDto) {
    if(typeof defi.titre !=="undefined")
      return defi.titre;
    return "HELLO";
  }

  checkIfNote(defi: DefiDto) {
    return !isNaN(defi.noteMoyenne!);
  }

  apendNewComment($event: CommentaireDto) {
    this.obsCom.next([...this.obsCom.value, $event]);
  }
}
