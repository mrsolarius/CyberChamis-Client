import {Component, OnInit} from '@angular/core';
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {ChamiDto} from "../../api/models/chami-dto";
import {DefiCount} from "../../api/models/defi-count";
import {lastValueFrom, map, Observable, switchMap} from "rxjs";
import {ChamiRestControllerService} from "../../api/services/chami-rest-controller.service";

export interface Author{
  chamis:ChamiDto,
  count:number
}

@Component({
  selector: 'app-active-author',
  templateUrl: './active-author.component.html',
  styleUrls: ['./active-author.component.scss']
})
export class ActiveAuthorComponent implements OnInit {

  chamisDtoObs = new Observable<Author[]>();
  defiCount!: DefiCount[];

  constructor(private defisRest: DefiRestControllerService, private chamiRest: ChamiRestControllerService) {
  }

  ngOnInit(): void {
    this.chamisDtoObs = this.defisRest.getNbDefiByAuteur().pipe(
      map((defis)=>{
        return defis.sort(this.compare).slice(0,4);
      }),
      map((defisTrier)=>{
        return defisTrier.map(async (defis)=>{
          return {
            chamis: await lastValueFrom(this.chamiRest.getById1({id: defis.auteurId!})),
            count:defis.count!
          }
        })
      }),
      switchMap(async (defisPromise)=>{
        return await Promise.all(defisPromise)
      })
    )
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
      while (i < activeAuteur.length) {
        this.chamiRest.getById1({id: activeAuteur[i].auteurId!}).subscribe((v) => {
          mostActiveAuhor[i] = v;
          console.log("MOSTACTIVEAUTHOR N°",i," : ",mostActiveAuhor[i]);
        });
        i++;
      }
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
