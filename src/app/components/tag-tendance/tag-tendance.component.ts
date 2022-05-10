import {Component, Input, OnInit} from '@angular/core';
import {TagCount} from "../../api/models/tag-count";

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
    let tagMax;
    tagMax=this.tags!.reduce((acc, val) => {
      return acc.count! < val.count! ? val : acc }
    );
    return tagMax.count;
  }

  getTagsPopulaires(max: number){
    let tagsPop: TagCount[];
    tagsPop = this.tags!.filter(tag => tag.count! >= max*2/3);
    return tagsPop;
  }

}
