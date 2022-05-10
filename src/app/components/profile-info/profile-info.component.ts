import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, firstValueFrom, lastValueFrom} from "rxjs";
import {ChamiDto} from "../../api/models/chami-dto";
import {ActivatedRoute} from "@angular/router";
import {ChamiRestControllerService} from "../../api/services/chami-rest-controller.service";
import {CommentaireDto} from "../../api/models/commentaire-dto";
import {CommentaireRestControllerService} from "../../api/services/commentaire-rest-controller.service";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {DefiDto} from "../../api/models/defi-dto";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  obsUser = new BehaviorSubject<ChamiDto>({});
  obsDefis = new BehaviorSubject<DefiDto[]>([]);

  constructor(private route:ActivatedRoute,
              private chamiRestController:ChamiRestControllerService,
              private comentaireService : CommentaireRestControllerService,
              private defiService:DefiRestControllerService) {

    this.obsUser.subscribe(async value => {
      if(value.id) {
        const val = await lastValueFrom(this.defiService.getByChami({id:value.id}));
        console.log(val);
        this.obsDefis.next(val);
      }
    })
  }

  async loadUser(){
    const param = await firstValueFrom(this.route.params)
    const id = param['id'];
    const user = await lastValueFrom(this.chamiRestController.getById1({id}));
    if (user)
      this.obsUser.next(user);
  }

  ngOnInit(): void {
    this.loadUser();
  }
}
