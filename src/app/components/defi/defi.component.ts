import {Component, Input, OnInit} from '@angular/core';
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {Defi} from "../../api/models/defi";

type Star = "star" | "star_border" | "star_half";



@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss']
})
export class DefiComponent {
  @Input() defi! : Defi;
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
}
