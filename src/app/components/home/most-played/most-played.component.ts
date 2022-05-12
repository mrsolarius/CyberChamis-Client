import {Component, Input, OnInit} from '@angular/core';
import {DefiDto} from "../../../apis/api-local/models/defi-dto";
import {ChamisCount} from "../../../apis/api-local/models/chamis-count";
import {DefiRestControllerService} from "../../../apis/api-local/services/defi-rest-controller.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-most-played',
  templateUrl: './most-played.component.html',
  styleUrls: ['./most-played.component.scss']
})
export class MostPlayedComponent implements OnInit {
  @Input() defis!: DefiDto[];
  defisNbChamisObs = new BehaviorSubject<ChamisCount[]>([]);
  defisNbChamis!: ChamisCount[];

  constructor(private defisRest : DefiRestControllerService) { }

  ngOnInit(): void {
    this.defisRest.getDefiNbChamis().subscribe((v)=>{this.defisNbChamisObs.next(v);});
    this.defisNbChamisObs.subscribe((v)=>{this.defisNbChamis = v;});
  }

  getMostPlayedDefis(defis:DefiDto[]) : DefiDto[] {
    let mostPlayedDefis: DefiDto[] = [];
    if (this.defisNbChamis != undefined) {
      this.defisNbChamis.sort(this.compare);
      const bestDefisNbChamis = this.defisNbChamis.slice(0, 5);
      /*
      on a : la liste des defis pas triés
      on veut : une sous-liste des defis triés par nombre de chamis
       */
      defis.filter(defi => {
        for (let i = 0; i < bestDefisNbChamis.length; i++) {
          if (defi.id === bestDefisNbChamis[i].idDefi) {
            mostPlayedDefis[i] = defi;
            return true;
          }
        }
        return false;
      });
      /*for (let i = 0; i < bestDefisNbChamis.length; i++) {
        mostPlayedDefis[i] = defis.find(defi => defi.id === bestDefisNbChamis[i].idDefi)!;
      }*/
    }
    return mostPlayedDefis;
  }

  compare(a : ChamisCount, b : ChamisCount) {
    if (a.count! < b.count!) {
      return 1;
    } else if (a.count! > b.count!) {
      return -1;
    } else {
      return 0;
    }
  }

}
