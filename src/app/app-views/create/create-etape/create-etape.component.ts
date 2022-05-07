import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

enum TypeEtape {
  Indication,Tache
}
export interface Tache{
  readonly question:string;
  readonly reponse:string;
}

export interface Etape {
  readonly titre: string;
  readonly description: string;
  readonly numero: number;
  readonly typeEtape: TypeEtape;
}
@Component({
  selector: 'app-create-etape',
  templateUrl: './create-etape.component.html',
  styleUrls: ['./create-etape.component.scss']
})
export class CreateEtapeComponent implements OnInit {
   @Output('group') formGroup = new EventEmitter<FormGroup>();
   typeEtape!: string;
   indication!:string;
   question!: string;
   reponse!: string;
   indice!:string;
   pointGagne!: number;
   pointPerdu!:number;

   listEtapes !: string[];

  selectable = true;
  removable = true;
  //@Output('ajoutEtape') ajoutEtape = new EventEmitter<void>();
  stepper: any;

  myGroup!:any;
  typeEtapeValidator: FormGroup;
  etapeIndication: FormGroup;
  etapeTache: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.typeEtapeValidator = this._formBuilder.group({
      typeEtape: new FormControl('', Validators.required)
    })
    this.etapeIndication = this._formBuilder.group({
      indicationTitre : ['', [Validators.required]],
      indication : ['', [Validators.required]],
    });
    this.etapeTache = this._formBuilder.group({
      tacheTitre : ['', [Validators.required]],
      question : ['', [Validators.required]],
      reponse : ['', [Validators.required]],
      indice : ['', [Validators.required]],
      pointsPerdus : ['', [Validators.required,Validators.min(1)]],
      pointsGagnes : ['', [Validators.required,Validators.min(1)]],
    });

    this.typeEtapeValidator.valueChanges.subscribe(value => {
      if (value.typeEtapeValidator === TypeEtape.Indication) {
        this.formGroup.emit(this.etapeIndication);
      }else {
        this.formGroup.emit(this.etapeTache);
      }
    });
    this.etapeIndication.valueChanges.subscribe(() => {
      this.formGroup.emit(this.etapeIndication);
    });
    this.etapeTache.valueChanges.subscribe(() => {
      this.formGroup.emit(this.etapeTache);
    });
  }

  ngOnInit(): void {
    this.formGroup.emit(this.typeEtapeValidator);
  }

  checkError(controlName: string, errorName: string) {
    if (this.typeEtapeValidator.controls['typeEtape'].value === TypeEtape.Indication) {
      return this.etapeIndication.controls[controlName].hasError(errorName);
    }else if(this.typeEtapeValidator.controls['typeEtape'].value === TypeEtape.Tache) {
      return this.etapeTache.controls[controlName].hasError(errorName);
    }
    return false;
  }
}
