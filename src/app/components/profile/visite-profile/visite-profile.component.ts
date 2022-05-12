import {Component, Input, OnInit} from '@angular/core';
import {VisiteDto} from "../../../apis/api-local/models/visite-dto";

@Component({
  selector: 'app-visite-profile',
  templateUrl: './visite-profile.component.html',
  styleUrls: ['./visite-profile.component.scss']
})
export class VisiteProfileComponent implements OnInit {

  @Input() visite !: VisiteDto;

  constructor() { }

  ngOnInit(): void {
  }

  getTitreDefi() {
    if(this.visite.defi?.titre){
      return this.visite.defi.titre;
    }
    return "Défi inconnu";
  }

  getFin() {
    if(this.visite.finVisite)
      return this.visite.finVisite.substring(0,10);
    return "Fin inconnue";
  }
}
