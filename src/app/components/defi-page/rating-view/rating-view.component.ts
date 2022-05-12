import {Component, Input, OnInit} from '@angular/core';
import {RatingDefiDto} from "../../../apis/api-local/models/rating-defi-dto";
import {RatingDto} from "../../../apis/api-local/models/rating-dto";

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

  getSortList(list : RatingDto[]|undefined){
    if(typeof list !== 'undefined' && list.length>0){
      return list.sort((a,b)=>{
        return b.note!-a.note!;
      });
    }
    return [];
  }

  toPersent(nbAt : number, total : number){
    return nbAt/total*100
  }
}
