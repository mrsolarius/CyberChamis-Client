import { Injectable } from '@angular/core';
import {GameRestControllerService} from "../api/services/game-rest-controller.service";
import {BehaviorSubject, firstValueFrom, lastValueFrom, Observable} from "rxjs";
import {VisiteDto} from "../api/models/visite-dto";
import {IndiceDto} from "../api/models/indice-dto";
import {filter} from "rxjs/operators";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface VisiteImpl extends VisiteDto{
  currentIndices:IndiceDto[];
  costNextIndice:number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayServiceService {
  private visite = new BehaviorSubject<VisiteImpl | null>(null);

  constructor(private gameService : GameRestControllerService, private userService : UserService,private router: Router,private snackBar: MatSnackBar) {
  }

  async startGame(defiId: string) {
      const id = await firstValueFrom(this.userService.getUserId());
      if(id!==-1) {
        try {
        const v = await lastValueFrom(this.gameService.visiteCourante({defiId, userId: id}));
        let i: IndiceDto[] = []
        try {
          i = await lastValueFrom(this.gameService.getResponseIndices({visiteId: v.id!}))
        } catch (e) {}
          let costIndice = 0;
          try {
            costIndice = await lastValueFrom(this.gameService.getIndiceCost({visiteId: v.id!}));
          }catch (e) {}

        this.visite.next({
          ...v,
          currentIndices: i,
          costNextIndice: costIndice
        });
        } catch (e) {
          const v = await lastValueFrom(this.gameService.startGame({defiId, userId:id}))
          let i : IndiceDto[] = []
          try{
            i = await lastValueFrom(this.gameService.getResponseIndices({visiteId:v.id!}))
          }catch (_){}
          let costIndice = 0;
          try {
            costIndice = await lastValueFrom(this.gameService.getIndiceCost({visiteId: v.id!}));
          }catch (_) {}
          this.visite.next({
            ...v,
            currentIndices:i,
            costNextIndice:costIndice
          })
        }
      }else{
        await this.router.navigate(['/home']);
        this.snackBar.open("Veuillez vous connecter pour jouer", "fermer", {
          duration: 10000,
        });
      }
  }

  async nextStep(){
    const v = await lastValueFrom(this.gameService.etapeSuivante({visiteId: this.getVisiteId()}));
    let i : IndiceDto[] = [];
    try{
      i = await lastValueFrom(this.gameService.getResponseIndices({visiteId: this.getVisiteId()}));
    }catch(_){}
    let costIndice = 0;
    try {
      costIndice = await lastValueFrom(this.gameService.getIndiceCost({visiteId: this.getVisiteId()}));
    }catch (e) {}
    this.visite.next({
      ...v,
      currentIndices:i,
      costNextIndice:costIndice
    })
  }

  async previousStep(){
    const v = await lastValueFrom(this.gameService.etapePrecedente({visiteId:this.getVisiteId()}));
    let i : IndiceDto[] = []
    try{
      i = await lastValueFrom(this.gameService.getResponseIndices({visiteId:this.getVisiteId()}))
    }catch (_){}
    let costIndice = 0;
    try {
      costIndice = await lastValueFrom(this.gameService.getIndiceCost({visiteId: this.getVisiteId()}));
    }catch (e) {}
    this.visite.next({
      ...v,
      currentIndices:i,
      costNextIndice:costIndice
    })
  }

  async checkResponse(response:string):Promise<boolean>{
    const value = await lastValueFrom(this.gameService.checkResponse({visiteId:this.getVisiteId(), response}));
    const v = this.visite.value;
    let costIndice = 0;
    try {
      costIndice = await lastValueFrom(this.gameService.getIndiceCost({visiteId: this.getVisiteId()}));
    }catch (e) {}
    this.visite.next({
      ...v,
      currentIndices:v?.currentIndices?v.currentIndices:[],
      costNextIndice:costIndice,
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
      const nv = await lastValueFrom(this.gameService.getVisites({visiteId:this.getVisiteId()}));
      this.visite.next({
        ...nv,
        currentIndices:v?.currentIndices?v.currentIndices:[],
        costNextIndice:v?.costNextIndice?v?.costNextIndice:0
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
    let costIndice = 0;
    try {
      costIndice = await lastValueFrom(this.gameService.getIndiceCost({visiteId: this.getVisiteId()}));
    }catch (e) {}
    this.visite.next({
      ...v,
      currentIndices:is,
      costNextIndice:costIndice
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
    const nv = await lastValueFrom(this.gameService.getVisites({visiteId:v?.id!}));
    this.visite.next({
      ...nv,
      currentIndices:v?.currentIndices?v.currentIndices:[],
      costNextIndice: v?.costNextIndice ? v?.costNextIndice : 0,
    });
  }
}
