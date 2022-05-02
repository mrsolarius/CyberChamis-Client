import { Injectable } from '@angular/core';
import {GameRestControllerService} from "../api/services/game-rest-controller.service";
import {BehaviorSubject, Observable} from "rxjs";
import {EtapeDto} from "../api/models/etape-dto";
import {VisiteDto} from "../api/models/visite-dto";
import {IndiceDto} from "../api/models/indice-dto";

@Injectable({
  providedIn: 'root'
})
export class PlayServiceService {
  private etape : BehaviorSubject<EtapeDto|null> = new BehaviorSubject<EtapeDto | null>(null);
  private visite : BehaviorSubject<VisiteDto|null> = new BehaviorSubject<VisiteDto | null>(null);
  private indices : BehaviorSubject<IndiceDto[]|null> = new BehaviorSubject<IndiceDto[] | null>(null);
  private static idUser : number = 1;

  constructor(private gameService : GameRestControllerService) {}

  startGame(defiId : string, userId:number = PlayServiceService.idUser){
    this.gameService.startGame({defiId,userId}).subscribe(this.visite);
  }

  nextStep(){
    this.gameService.etapeSuivante({visiteId:this.getVisiteId()}).subscribe(this.etape);
  }

  previousStep(){
    this.gameService.etapePrecedente({visiteId:this.getVisiteId()}).subscribe(this.etape);
  }

  async checkResponse(response:string):Promise<boolean>{
    const value = await this.gameService.checkResponse({visiteId:this.getVisiteId(), response}).toPromise();
    return typeof value==="undefined"?false:value;
  }

  editStatus(status : 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE'){
    this.gameService.editStatus({visiteId:this.getVisiteId(),status}).subscribe(this.visite);
  }

  revealHint(){
    this.gameService.revealIndice({visiteId:this.getVisiteId()}).subscribe({
      complete: () => this.gameService.getResponseIndices({visiteId:this.getVisiteId()}).subscribe(this.indices)
    })
  }

  private getVisiteId():number{
    if(this.visite.getValue()==null){
      throw new Error("not current visite found")
    }
    if(this.visite.getValue()?.id==null){
      throw new Error("id of current visite is null")
    }
    return  this.visite.getValue()?.id!;
  }

  get getObsVisite() : Observable<VisiteDto>{
    return this.visite.asObservable().pipe(filter(this.isNonNull))
  }

  get getObsIndices() : Observable<IndiceDto[]>{
    return this.indices.asObservable().pipe(filter(this.isNonNull));
  }

  isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null && typeof value !== "undefined";
  }

}
