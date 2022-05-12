import {Component, Input, OnInit} from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";
import {UserService} from "../../user/user.service";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-defi-created',
  templateUrl: './defi-created.component.html',
  styleUrls: ['./defi-created.component.scss']
})
export class DefiCreatedComponent implements OnInit {

  @Input() defiCreated !: DefiDto;

  constructor(private userService:UserService,
              private defiService:DefiRestControllerService) { }

  getUserCo(){
    return this.userService.getUserId();
  }

  async deleteDefi(){
    if(this.defiCreated.id)
      await lastValueFrom(this.defiService.deleteDefi({id:this.defiCreated.id}));
  }

  ngOnInit(): void {
  }

  getAuteurId() {
    if(this.defiCreated.auteur?.id)
      return this.defiCreated.auteur.id;
    return -2;
  }
}
