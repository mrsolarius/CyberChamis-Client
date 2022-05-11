import {Component, Input, OnInit} from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";
import {BehaviorSubject, lastValueFrom} from "rxjs";
import {CommentaireDto} from "../../api/models/commentaire-dto";
import {ChamiDto} from "../../api/models/chami-dto";
import {CommentaireRestControllerService} from "../../api/services/commentaire-rest-controller.service";
import {NoteRestControllerService} from "../../api/services/note-rest-controller.service";
import {NoteDto} from "../../api/models/note-dto";

@Component({
  selector: 'app-histo-comment-user',
  templateUrl: './histo-comment-user.component.html',
  styleUrls: ['./histo-comment-user.component.scss']
})
export class HistoCommentUserComponent implements OnInit {

  panelOpenState = false;
  @Input() defi !: DefiDto;
  @Input() user !: ChamiDto;
  obsComs = new BehaviorSubject<CommentaireDto[]>([]);
  obsNote = new BehaviorSubject<NoteDto>({});

  constructor(private comService:CommentaireRestControllerService,
              private noteService:NoteRestControllerService) { }

  async loadComs(){
    const idDefi = this.defi.id!;
    const idChami = this.user.id!;
    const coms = await lastValueFrom(this.comService.getCommentairesByDefiAndChami({idDefi, idChami}));
    if(coms)
      this.obsComs.next(coms);
  }

  ngOnInit(): void {
    this.loadComs();
    this.loadNote();
  }

  getNomDefi() {
    if(this.defi){
      return this.defi.titre;
    }
    return "Defi sans titre"
  }

  async loadNote(){
    const defiId = this.defi.id!;
    const utilistateurId = this.user.id!;
    const note = await lastValueFrom(this.noteService.getNote({defiId, utilistateurId}));
    if(note)
      this.obsNote.next(note);
  }
}
