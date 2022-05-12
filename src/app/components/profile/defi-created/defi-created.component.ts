import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DefiDto} from "../../../apis/api-local/models/defi-dto";
import {UserService} from "../../../services/user.service";
import {lastValueFrom} from "rxjs";
import {CreationRestControllerService} from "../../../apis/api-local/services/creation-rest-controller.service";

@Component({
  selector: 'app-defi-created',
  templateUrl: './defi-created.component.html',
  styleUrls: ['./defi-created.component.scss']
})
export class DefiCreatedComponent implements OnInit {

  @Input() defiCreated !: DefiDto;
  @Output() defiDeletesChange = new EventEmitter<void>();

  constructor(private userService:UserService,
              private creationService:CreationRestControllerService) { }

  getUserCo(){
    return this.userService.getUserId();
  }

  async deleteDefi(){
    if(this.defiCreated.id) {
      await lastValueFrom(this.creationService.deleteDefi({id: this.defiCreated.id}));
      this.defiDeletesChange.emit();
    }
  }

  ngOnInit(): void {
  }

  getAuteurId() {
    if(this.defiCreated.auteur?.id)
      return this.defiCreated.auteur.id;
    return -2;
  }
}
