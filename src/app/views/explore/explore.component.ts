import {Component, OnInit} from '@angular/core';
import {DefiDto} from "../../apis/api-local/models/defi-dto";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  defiFound : DefiDto|null = null;
  constructor() {
  }

  ngOnInit(): void {
  }

  functionHandle(defi : DefiDto){
    console.log(defi);
    this.defiFound=defi;
  }

}
