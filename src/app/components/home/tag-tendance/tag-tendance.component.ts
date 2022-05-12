import {Component, Input, OnInit} from '@angular/core';
import {TagCount} from "../../../apis/api-local/models/tag-count";

@Component({
  selector: 'app-tag-tendance',
  templateUrl: './tag-tendance.component.html',
  styleUrls: ['./tag-tendance.component.scss']
})
export class TagTendanceComponent implements OnInit {
  @Input() tags: TagCount[] | undefined;


  constructor() {
  }

  ngOnInit(): void {

  }

  trierTags(): TagCount[] {
    if (this.tags != undefined) {
      const max = this.getMaxApparition();
      this.tags=this.getTagsPopulaires(max!);
      this.tags.sort(this.compare);
    }
    return this.tags!;
  }

  compare(a : TagCount, b : TagCount) {
    if (a.count! < b.count!) {
      return 1;
    } else if (a.count! > b.count!) {
      return -1;
    } else {
      return 0;
    }
  }

  getMaxApparition(){
    if(this.tags){
      if(this.tags.length>0){
        let tagMax;
        tagMax=this.tags!.reduce((acc, val) => {
          return acc.count! < val.count! ? val : acc }
        );
        return tagMax.count;
      }
      return 0;
    }
    return 0;
  }

  getTagsPopulaires(max: number){
    let tagsPop: TagCount[];
    tagsPop = this.tags!.filter(tag => tag.count! >= max*1/3);
    return tagsPop;
  }

}
