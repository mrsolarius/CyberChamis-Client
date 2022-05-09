import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, firstValueFrom, lastValueFrom} from "rxjs";
import {ChamiDto} from "../../api/models/chami-dto";
import {ActivatedRoute} from "@angular/router";
import {ChamiRestControllerService} from "../../api/services/chami-rest-controller.service";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  obsUser = new BehaviorSubject<ChamiDto>({});

  constructor(private route:ActivatedRoute,
              private chamiRestController:ChamiRestControllerService) { }

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
