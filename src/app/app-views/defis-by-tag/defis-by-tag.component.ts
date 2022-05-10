import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {DefiDto} from "../../api/models/defi-dto";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";

@Component({
  selector: 'app-defis-by-tag',
  templateUrl: './defis-by-tag.component.html',
  styleUrls: ['./defis-by-tag.component.scss']
})
export class DefisByTagComponent implements OnInit {
  tag: string = 'not found';
  defisObs : Observable<DefiDto[]>;

  constructor(private currentRoute:ActivatedRoute, private defisRest : DefiRestControllerService) {
    currentRoute.params.subscribe(params => {
      console.log(params);
      this.tag = params['id'];
    });
    this.defisObs = defisRest.getDefisBy({id : this.tag});
  }

  ngOnInit(): void {
  }


}
