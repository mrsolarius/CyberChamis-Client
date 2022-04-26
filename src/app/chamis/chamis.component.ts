import { Component, OnInit } from '@angular/core';
import {ChamiRestControllerService} from "../api/services/chami-rest-controller.service";

@Component({
  selector: 'app-chamis',
  templateUrl: './chamis.component.html',
  styleUrls: ['./chamis.component.scss']
})
export class ChamisComponent implements OnInit {

  constructor(private cm : ChamiRestControllerService) { }

  get chamisObs(){
    return this.cm.getChamis();
  }

  ngOnInit(): void {
  }

}
