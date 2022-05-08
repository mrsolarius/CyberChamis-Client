import {DefiDto} from "../../api/models/defi-dto";
import {Component, Input} from '@angular/core';
import {ArretDto} from "../../api/models/arret-dto";

type Star = "star" | "star_border" | "star_half";



@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss']
})
export class DefiComponent {
  @Input('defi') defi! : DefiDto;
  constructor() { }

  getStar(note: number): Star[] {
    const arr = Array(5).fill("star_border");
    return arr.map((star, index) => {
      if (note>=index+0.25 && note<=index+0.75) {
        return "star_half";
      }else if (index+1 <= note+0.75) {
        return "star";
      }else{
        return "star_border";
      }
    });
  }

  getNomArret(arret : ArretDto | undefined) {
    if(arret){
      if(arret.nomArret)
        return arret.nomArret;
      else
        return undefined;
    }else
      return undefined;
  }
}
