import {Component, Input, OnInit} from '@angular/core';
import {VisiteDto} from "../../api/models/visite-dto";
import {NoteRestControllerService} from "../../api/services/note-rest-controller.service";
import {NoteDto} from "../../api/models/note-dto";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  @Input('visite') visite!:VisiteDto;
  note:NoteDto={};

  constructor(private noteRestController : NoteRestControllerService) { }

  async ngOnInit(): Promise<void> {
    //@Todo passer l'id de l'utilisateur par le service correspondant plus tard
    try{
      const note = await firstValueFrom(this.noteRestController.getNote({defiId:this.visite?.defi?.id!,utilistateurId:1}));
      this.note = note
    }catch (e){}
  }

  toPersent(){
    const points = this.getPoints()
    const pointsTotal = this.getPointsTotal()
    return Math.round(points/pointsTotal*100);
  }

  getPoints(){
    return this.visite.points?this.visite.points:0;
  }
  getPointsTotal(){
    return this.visite.defi?.pointTotaux?this.visite.defi?.pointTotaux:1;
  }

  async updateNote(valeur: number) {
    try {
      const note = await firstValueFrom(this.noteRestController.createNote({
        body: {
          idDefi: this.visite.defi?.id!,
          valeur,
          //@Todo passer l'id de l'utilisateur par le service correspondant plus tard
          idUtilisateur: 1
        }
      }));
      this.note = note;
    } catch (e) {
      const note = await firstValueFrom(this.noteRestController.updateNote({
        body:valeur,
        utilistateurId:1,
        defiId:this.visite.defi?.id!
      }));
      this.note
    }
  }

  getRating() : number {
    if(this.note) {
      return <number>this.note.valeur
    };
    return 0;
  }
}
