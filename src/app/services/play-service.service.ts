import { Injectable } from '@angular/core';
import {GameRestControllerService} from "../api/services/game-rest-controller.service";
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {VisiteDto} from "../api/models/visite-dto";
import {IndiceDto} from "../api/models/indice-dto";
import {filter} from "rxjs/operators";

export interface VisiteImpl extends VisiteDto{
  currentIndices:IndiceDto[];
}

@Injectable({
  providedIn: 'root'
})
export class PlayServiceService {
  private visite = new BehaviorSubject<VisiteImpl | null>(null);
  private static idUser : number = 1;

  constructor(private gameService : GameRestControllerService) {
  }

  async startGame(defiId: string, userId: number = PlayServiceService.idUser) {
    try {
      const v = await lastValueFrom(this.gameService.visiteCourante({defiId, userId}))
      let i : IndiceDto[] = []
      try{
        i = await lastValueFrom(this.gameService.getResponseIndices({visiteId:v.id!}))
      }catch (e){
        console.log(e)
      }
      console.log(v)
      console.log(i)
      this.visite.next({
        ...v,
        currentIndices:i
      });
    } catch (e) {
      const v = await lastValueFrom(this.gameService.startGame({defiId, userId}))
      let i : IndiceDto[] = []
      try{
        i = await lastValueFrom(this.gameService.getResponseIndices({visiteId:v.id!}))
      }catch (_){}
      this.visite.next({
        ...v,
        currentIndices:i,
      })
    }
  }

  async nextStep(){
    const v = await lastValueFrom(this.gameService.etapeSuivante({visiteId: this.getVisiteId()}));
    let i : IndiceDto[] = [];
    try{
      i = await lastValueFrom(this.gameService.getResponseIndices({visiteId: this.getVisiteId()}));
    }catch(_){}
    this.visite.next({
      ...v,
      currentIndices:i,
    })
  }

  async previousStep(){
    const v = await lastValueFrom(this.gameService.etapePrecedente({visiteId:this.getVisiteId()}));
    let i : IndiceDto[] = []
    try{
      i = await lastValueFrom(this.gameService.getResponseIndices({visiteId:this.getVisiteId()}))
    }catch (_){}
    console.log(v);
    this.visite.next({
      ...v,
      currentIndices:i
    })
  }

  async checkResponse(response:string):Promise<boolean>{
    const value = await lastValueFrom(this.gameService.checkResponse({visiteId:this.getVisiteId(), response}));
    const v = this.visite.value;
    this.visite.next({
      ...v,
      currentIndices:v?.currentIndices?v.currentIndices:[],
      reponseCourante:{
        ...v?.reponseCourante,
        isCorrect:value
      }
    })
    return typeof value==="undefined"?false:value;
  }

  async editStatus(status : 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE'){
    try {
      const v = this.visite.value
      await lastValueFrom(this.gameService.editStatus({visiteId:this.getVisiteId(),status}));
      const nv = lastValueFrom(this.gameService.getVisites({visiteId:this.getVisiteId()}));
      this.visite.next({
        ...nv,
        currentIndices:v?.currentIndices?v.currentIndices:[],
      });
      return true;
    }catch (e) {
      return false;
    }
  }

  async revealHint(){
    await lastValueFrom(this.gameService.revealIndice({visiteId:this.getVisiteId()}));
    const v = await lastValueFrom(this.gameService.getVisites({visiteId:this.getVisiteId()}))
    const is = await lastValueFrom(this.gameService.getResponseIndices({visiteId:this.getVisiteId()}))
    this.visite.next({
      ...v,
      currentIndices:is,
    })
  }

  private getVisiteId():number {
    if (this.visite.value == null) {
      throw new Error("not current visite found")
    }
    if (this.visite.value?.id == null) {
      throw new Error("id of current visite is null")
    }
    return this.visite.value?.id!;
  }

  get getObsVisite() : Observable<VisiteImpl>{
    return this.visite.asObservable().pipe(filter(this.isNonNull))
  }

  isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null && typeof value !== "undefined";
  }

  async updateVisiteFromSrv() {
    const v = this.visite.value
    const nv = await lastValueFrom(this.gameService.getVisites({visiteId:this.getVisiteId()}));
    this.visite.next({
      ...nv,
      currentIndices:v?.currentIndices?v.currentIndices:[],
    });
  }
}
