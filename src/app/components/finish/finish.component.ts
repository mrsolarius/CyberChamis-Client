import {Component, Input, OnInit} from '@angular/core';
import {VisiteDto} from "../../api/models/visite-dto";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  @Input('visite') visite!:VisiteDto;

  constructor() { }

  ngOnInit(): void {
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
}
