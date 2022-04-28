import { Component, OnInit } from '@angular/core';
import {DefiRestControllerService} from "../api/services/defi-rest-controller.service";
import {Defi} from "../api/models/defi";

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss']
})
export class DefiComponent implements OnInit {
  defis: Array<Defi> = [];

  constructor(private defi : DefiRestControllerService) {
    this.defi.getDefis().subscribe(data => {
      this.defis = data;
    });
  }

  toString(defi : any){
    return JSON.stringify(defi);
  }

  get observableChamis() {
    return this.defi.getDefis();
  }

  ngOnInit(): void {
  }

  logChami(){
    console.log(this.defi);
  }

}
