import { Injectable } from '@angular/core';
import {GameRestControllerService} from "../api/services/game-rest-controller.service";
import {BehaviorSubject, Observable} from "rxjs";
import {EtapeDto} from "../api/models/etape-dto";
import {VisiteDto} from "../api/models/visite-dto";
import {IndiceDto} from "../api/models/indice-dto";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayServiceService {
  private etape = new BehaviorSubject<EtapeDto | null>(null);
  private visite = new BehaviorSubject<VisiteDto | null>(null);
  private indices = new BehaviorSubject<IndiceDto[]>([]);
  private static idUser : number = 1;

  constructor(private gameService : GameRestControllerService) {
    this.getObsEtape.subscribe((e)=>{
      const v = this.visite.getValue();
      this.visite.next({
        ...v,
        etapeCourante:e
      })
    })
  }

  startGame(defiId : string, userId:number = PlayServiceService.idUser){
    this.gameService.visiteCourante({defiId,userId}).subscribe({
      next: (v) =>{
          this.visite.next(v);
      },
      error: () =>{
        this.gameService.startGame({defiId,userId}).subscribe((v)=>this.visite.next(v));
      }
    })
  }

  nextStep(){
    this.gameService.etapeSuivante({visiteId:this.getVisiteId()}).subscribe((e)=>this.etape.next(e));
  }

  previousStep(){
    this.gameService.etapePrecedente({visiteId:this.getVisiteId()}).subscribe((e)=>this.etape.next(e));
  }

  async checkResponse(response:string):Promise<boolean>{
    const value = await this.gameService.checkResponse({visiteId:this.getVisiteId(), response}).toPromise();
    return typeof value==="undefined"?false:value;
  }

  editStatus(status : 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE'){
    this.gameService.editStatus({visiteId:this.getVisiteId(),status}).subscribe((s)=> {
      const v = this.visite.getValue();
      this.visite.next({
        ...v,
        statut:s
      })
    });
  }

  revealHint(){
    this.gameService.revealIndice({visiteId:this.getVisiteId()}).subscribe({
      complete: () => this.gameService.getResponseIndices({visiteId:this.getVisiteId()}).subscribe((i)=>this.indices.next(i))
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

  get getObsEtape() : Observable<EtapeDto>{
    return this.etape.asObservable().pipe(filter(this.isNonNull));
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
