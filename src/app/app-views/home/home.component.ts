import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import {DefiDto} from "../../api/models/defi-dto";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";

@Component({


  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defi:BehaviorSubject<DefiDto[]> = new BehaviorSubject<DefiDto[]>([]);
  patate:DefiDto[] = [
    {
      titre:"A la recherche du graphe mouton",
      description:"Primitus vidisse ante nummatum si tumentemque Romam decennium tumentemque enixius aliquem mentiri introieris aliquem bene decennium et mentiri tamquam haec exoptatus suscipieris non haec primitus et sic primitus coactusque ideo.",
      duree:"5",
      noteMoyenne:1,
      arretDTO:{
        nomArret: "Chavant"
      
    }},
  {
    titre:"Le Bonnet du BDE",
    description:"Adhibitis praestituto responsum truci et quae aliis iudex magister quidve cuius nec permissi adhibitis adsistebant subinde aulaeum reginae cursim aliis die stimulis funestis ad cuius interrogationibus quid adhibitis stimulis Caesarem.",
    duree:"4",
    noteMoyenne:4,
    arretDTO:{
      nomArret: "Ecole hospitalière"
  }},
  
  
  {
    titre:"Ou est l'homme au pull bleu?",
    description:"Etiam odisse adhiberemus fuit inimicitiarum praecipiendum ut minus fuissemus ut valet ferendum in minus tempus fuissemus in etiam amicitiam fuit eum amare amare amare fuit cogitandum eum etiam in amare.",
    duree:"9",
    noteMoyenne:2,
    arretDTO:{
      nomArret: "Condillac"
    }

  }];
  constructor(private defisRest : DefiRestControllerService) {}

  ngOnInit(): void {
    this.defisRest.getDefis().pipe(filter(this.isNonNull)).subscribe((v)=>{
      this.defi.next(v);
    });
  }


  isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null && typeof value !== "undefined";
  }

  get obs(){
    return this.defi.asObservable()
  }

}
