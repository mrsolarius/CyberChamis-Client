import {Component, OnInit} from '@angular/core';
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {ChamiDto} from "../../api/models/chami-dto";
import {DefiCount} from "../../api/models/defi-count";
import {BehaviorSubject} from "rxjs";
import {ChamiRestControllerService} from "../../api/services/chami-rest-controller.service";

@Component({
  selector: 'app-active-author',
  templateUrl: './active-author.component.html',
  styleUrls: ['./active-author.component.scss']
})
export class ActiveAuthorComponent implements OnInit {

  ChamisObs = new BehaviorSubject<DefiCount[]>([]);
  defiCount!: DefiCount[];

  constructor(private defisRest: DefiRestControllerService, private chamiRest: ChamiRestControllerService) {
  }

  ngOnInit(): void {
    this.defisRest.getNbDefiByAuteur().subscribe((v) => {
      this.ChamisObs.next(v);
    });
    this.ChamisObs.subscribe((v) => {
      this.defiCount = v;
    });
  }

  getMostActiveAuthors(): ChamiDto[] {
    let mostActiveAuhor: ChamiDto[] = [];
    console.log("DEFICOUNT -> ",this.defiCount);
    if (this.defiCount != undefined) {
      this.defiCount.sort(this.compare);
      const activeAuteur = this.defiCount.slice(0, 4);
      let i = 0;
      console.log("MOSTACTIVEAUTHOR AVANT : ",mostActiveAuhor[i]);
      console.log("auteur id : ",activeAuteur[i].auteurId);
      /*while (i < activeAuteur.length) {
        this.chamiRest.getById1({id: activeAuteur[i].auteurId!}).subscribe((v) => {
          mostActiveAuhor[i] = v;
          console.log("MOSTACTIVEAUTHOR N°",i," : ",mostActiveAuhor[i]);
        });
        i++;
      }*/
    }
    return mostActiveAuhor;
  }

  compare(a: DefiCount, b: DefiCount) {
    if (a.count! < b.count!) {
      return 1;
    } else if (a.count! > b.count!) {
      return -1;
    } else {
      return 0;
    }
  }

}
