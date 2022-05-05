import {Component, Input, OnInit} from '@angular/core';
import {CommentaireDto} from "../../api/models/commentaire-dto";
import {ChamiRestControllerService, CommentaireRestControllerService} from "../../api/services";
import {ChamiDto} from "../../api/models";
import {BehaviorSubject, firstValueFrom, lastValueFrom} from "rxjs";

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {
  @Input() commentaire !: CommentaireDto;
  obsChami = new BehaviorSubject<ChamiDto>({});

  constructor(private chamiRestController:ChamiRestControllerService) {

  }

  async loadUser(){
    const id = this.commentaire.idUtilisateur!;
    const chami = await lastValueFrom(this.chamiRestController.getById1({id}));
    console.log(chami)
    if (chami)
      this.obsChami.next(chami);
  }

  ngOnInit(): void {
    this.loadUser();
  }

}
