import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {lastValueFrom, map, Observable, switchAll, switchMap} from "rxjs";
import {DefiDto} from "../../apis/api-local/models/defi-dto";
import {DefiRestControllerService} from "../../apis/api-local/services/defi-rest-controller.service";
import {FirefilesService} from "../../services/firefiles.service";

@Component({
  selector: 'app-defis-by-tag',
  templateUrl: './defis-by-tag.component.html',
  styleUrls: ['./defis-by-tag.component.scss']
})
export class DefisByTagComponent implements OnInit {
  tag: string = 'not found';
  defisObs : Observable<DefiDto[]>;

  constructor(private currentRoute:ActivatedRoute, private defisRest : DefiRestControllerService, private fileService: FirefilesService) {

    this.defisObs = currentRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        this.tag = id;
        return defisRest.getDefisBy({id})
      }),
      map((defis) => {
        return defis.map(async defi => {
          return {
            ...defi,
            img: await lastValueFrom(this.fileService.getPhotoUrlObs('defis', defi.img!))
          }
        })
      }),
      switchMap(defis => {
        return Promise.all(defis)
      })
    );
  }

  ngOnInit(): void {
  }


}
