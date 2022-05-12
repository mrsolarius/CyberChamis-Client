import {Component, Input, OnInit} from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {ChamisCount} from "../../api/models/chamis-count";

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {
  @Input() defis!: DefiDto[];
  @Input() defisNbChamis!: ChamisCount[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getBestDefis(defis:DefiDto[]) : DefiDto[] {
    let bestDefis: DefiDto[] = [];
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
            bestDefis[i] = defi;
            return true;
          }
        }
        return false;
      });
    }
    return bestDefis;
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
