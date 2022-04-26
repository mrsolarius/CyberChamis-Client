import { Component, OnInit } from '@angular/core';
import {ChamiRestControllerService} from "../api/services/chami-rest-controller.service";
import {Chami} from "../api/models/chami";

@Component({
  selector: 'app-chamis',
  templateUrl: './chamis.component.html',
  styleUrls: ['./chamis.component.scss']
})
export class ChamisComponent implements OnInit {
  chamis: Array<Chami> = [];

  constructor(private cm : ChamiRestControllerService) {
    this.cm.getChamis().subscribe(data => {
      this.chamis = data;
    });
  }

  toString(chami : any){
    return JSON.stringify(chami);
  }

  get observableChamis() {
    return this.cm.getChamis();
  }

  ngOnInit(): void {
  }

  logChami(){
    console.log(this.chamis);
  }

}
