import {Component, Input, OnInit} from '@angular/core';
import {DefiDto} from "../../../apis/api-local/models/defi-dto";
import {DefiRestControllerService} from "../../../apis/api-local/services/defi-rest-controller.service";
import {ChamisCount} from "../../../apis/api-local/models/chamis-count";
import {BehaviorSubject, lastValueFrom} from "rxjs";

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {
  @Input() defis!: DefiDto[];
  defisNbChamis!: ChamisCount[];

  constructor(private defisRest : DefiRestControllerService) {
  }

  async ngOnInit(): Promise<void> {
    this.defisNbChamis = await lastValueFrom(this.defisRest.getDefiNbChamis());
  }

  getBestDefis() : DefiDto[] {
    let bestDefisPlayed: DefiDto[] = [];
    if (this.defisNbChamis != undefined) {
      let bestDefis: DefiDto[];
      bestDefis = this.defis.filter(defi => !isNaN(<number>defi.noteMoyenne)).sort(this.compareNotes).slice(0,5);
      //slice defi de 5
      console.log("bestDefis", bestDefis);

      // tableau de tableau, chaque element contient les defis de la meme note
      let defisByNote: DefiDto[][] = [];
      let currentNote = bestDefis[0].noteMoyenne;
      let currentDefis: DefiDto[] = [];
      for (let i = 0; i < bestDefis.length; i++) {
        if (bestDefis[i].noteMoyenne == currentNote) {
          currentDefis.push(bestDefis[i]);
        } else {
          defisByNote.push(currentDefis);
          currentNote = bestDefis[i].noteMoyenne;
          currentDefis = [];
          currentDefis.push(bestDefis[i]);
        }
      }
      //bestDefisPlayed = defisByNote.flat();
      // pour chaque element de defisByNote, on sort les defis les plus chamis
      for (let i = 0; i < defisByNote.length; i++) {
        defisByNote[i].sort((a,b)=>{
          let aNbChamis = this.defisNbChamis.find((v) => {
            return v.idDefi == a.id;
          });
          let bNbChamis = this.defisNbChamis.find((v) => {
            return v.idDefi == b.id;
          });
          if (aNbChamis == undefined) {
            return 1;
          }
          if (bNbChamis == undefined) {
            return -1;
          }
          return bNbChamis.count! - aNbChamis.count!;
        });
      }
      defisByNote.map((v)=>{v.map(value => bestDefisPlayed.push(value));});
      /*while(this.isDefiUnrated(bestDefisPlayed)){
        bestDefisPlayed.pop();
      }*/
    }
    return bestDefisPlayed;
  }

  compareNotes(a: DefiDto, b: DefiDto) {
    if (a.noteMoyenne! < b.noteMoyenne! || isNaN(a.noteMoyenne!)) {
      return 1;
    }
    if (a.noteMoyenne! > b.noteMoyenne!) {
      return -1;
    }
    return 0;
  }

  isDefiRated(defis: DefiDto[]) : boolean {
    return defis.find((defi) => {return defi.noteMoyenne != undefined && !isNaN(defi.noteMoyenne)}) != undefined;
  }

  isDefiUnrated(defis: DefiDto[]) : boolean {
    return defis.find((defi) => {return defi.noteMoyenne == undefined || isNaN(defi.noteMoyenne)}) != undefined;
  }

}
