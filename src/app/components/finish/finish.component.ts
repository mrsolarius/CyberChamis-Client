import {Component, Input, OnInit} from '@angular/core';
import {VisiteDto} from "../../api/models/visite-dto";
import {NoteRestControllerService} from "../../api/services/note-rest-controller.service";
import {NoteDto} from "../../api/models/note-dto";
import {firstValueFrom} from "rxjs";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  @Input('visite') visite!:VisiteDto;
  note:NoteDto={};

  constructor(private noteRestController : NoteRestControllerService, public userService : UserService) { }

  async ngOnInit(): Promise<void> {
    try{
      const id = await firstValueFrom(this.userService.getUserId());
      if (id!==-1) {
        this.note = await firstValueFrom(this.noteRestController.getNote({
          defiId: this.visite?.defi?.id!,
          utilistateurId: id
        }));
      }
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
      const id = await firstValueFrom(this.userService.getUserId());
      if (id!==-1) {
        this.note = await firstValueFrom(this.noteRestController.createNote({
          body: {
            idDefi: this.visite.defi?.id!,
            valeur,
            idUtilisateur: id
          }
        }));
      }
    } catch (e) {
      this.note = await firstValueFrom(this.noteRestController.updateNote({
        body: valeur,
        utilistateurId: 1,
        defiId: this.visite.defi?.id!
      }));
    }
  }

  getRating() : number {
    if(this.note) {
      return <number>this.note.valeur
    }
    return 0;
  }
}
