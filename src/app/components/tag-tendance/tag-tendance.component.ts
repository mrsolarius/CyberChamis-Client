import {Component, Input, OnInit} from '@angular/core';

export interface trendTagDto{
  tag: string;
  nbdefis: number;
}

@Component({
  selector: 'app-tag-tendance',
  templateUrl: './tag-tendance.component.html',
  styleUrls: ['./tag-tendance.component.scss']
})
export class TagTendanceComponent implements OnInit {
  @Input() tags: trendTagDto[] = [];


  constructor() {
  }

  ngOnInit(): void {

  }

  trierTags(tagsNonTrie: trendTagDto[]): trendTagDto[] {
    tagsNonTrie.sort(this.compare).reverse();
    return tagsNonTrie;
  }

  compare(a : trendTagDto, b : trendTagDto) {
    if (a.nbdefis < b.nbdefis) {
      return -1;
    } else if (a.nbdefis > b.nbdefis) {
      return 1;
    } else {
      return 0;
    }
  }
}
