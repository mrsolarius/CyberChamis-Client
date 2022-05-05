import {Component, Input, OnInit} from '@angular/core';
import {RatingDefiDto} from "../../api/models/rating-defi-dto";

@Component({
  selector: 'app-rating-view',
  templateUrl: './rating-view.component.html',
  styleUrls: ['./rating-view.component.scss']
})
export class RatingViewComponent implements OnInit {
  @Input('rating') rating!: RatingDefiDto
  @Input('avg') avg!:number;

  constructor() { }

  ngOnInit(): void {
  }

  getStar(note:number){
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

  toPersent(nbAt : number, total : number){
    return nbAt/total*100
  }
}
