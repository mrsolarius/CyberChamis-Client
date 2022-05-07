import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateEtapeService, EtapeForm, TypeEtape} from "../create-etape.service";

@Component({
  selector: 'app-create-etape',
  templateUrl: './create-etape.component.html',
  styleUrls: ['./create-etape.component.scss']
})
export class CreateEtapeComponent implements OnInit {
  @Input('etape') etape!: EtapeForm;

  typeEtapeValidator: FormGroup;
  etapeIndication: FormGroup;
  etapeTache: FormGroup;

  constructor(private _formBuilder: FormBuilder, private createEtapeService: CreateEtapeService) {
    this.typeEtapeValidator = this._formBuilder.group({
      typeEtape: new FormControl('', Validators.required)
    })
    this.etapeIndication = this._formBuilder.group({
      indicationTitre: ['', [Validators.required]],
      indication: ['', [Validators.required]],
    });
    this.etapeTache = this._formBuilder.group({
      tacheTitre: ['', [Validators.required]],
      question: ['', [Validators.required]],
      reponse: ['', [Validators.required]],
      indice: ['', [Validators.required]],
      pointsPerdus: ['', [Validators.required, Validators.min(1)]],
      pointsGagnes: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    if (this.etape) {
      this.typeEtapeValidator.controls['typeEtape'].setValue(this.etape.typeEtape);
      this.etapeIndication.controls['indicationTitre'].setValue(this.etape.titre);
      this.etapeIndication.controls['indication'].setValue(this.etape.indication);
      this.etapeTache.controls['tacheTitre'].setValue(this.etape.titre);
      this.etapeTache.controls['question'].setValue(this.etape.question);
      this.etapeTache.controls['reponse'].setValue(this.etape.reponse);
      this.etapeTache.controls['indice'].setValue(this.etape.indice);
      this.etapeTache.controls['pointsPerdus'].setValue(this.etape.pointsPerdus);
      this.etapeTache.controls['pointsGagnes'].setValue(this.etape.pointsGagnes);
    }
    this.typeEtapeValidator.valueChanges.subscribe(() => {
      this.updateEtape();
      this.createEtapeService.editEtape(this.etape.numero, this.etape);
    });

    this.etapeIndication.valueChanges.subscribe(() => {
      this.updateEtape();
      this.createEtapeService.editEtape(this.etape.numero, this.etape);
    });
    this.etapeTache.valueChanges.subscribe(() => {
      this.updateEtape();
      this.createEtapeService.editEtape(this.etape.numero, this.etape);
    });
  }

  checkError(controlName: string, errorName: string) {
    if (this.typeEtapeValidator.controls['typeEtape'].value === "Indication") {
      if (this.etapeIndication.controls[controlName]) {
        return this.etapeIndication.controls[controlName].hasError(errorName);
      }
    } else if (this.typeEtapeValidator.controls['typeEtape'].value === "Tache") {
      if (this.etapeTache.controls[controlName]) {
        return this.etapeTache.controls[controlName].hasError(errorName);
      }
    }
    return false;
  }


  updateEtape() {
    console.log("indic", this.typeEtapeValidator.controls['typeEtape'].value)
    console.log("type", TypeEtape.Indication)
    if (this.typeEtapeValidator.controls['typeEtape'].value === "Indication") {
      console.log("indication" + this.etapeIndication.controls['indicationTitre'].value);
      this.etape = {
        ...this.etape,
        titre: this.etapeIndication.controls['indicationTitre'].value,
        indication: this.etapeIndication.controls['indication'].value,
        typeEtape: TypeEtape.Indication,
        isValide: this.etapeIndication.valid && this.typeEtapeValidator.valid
      }
    } else if (this.typeEtapeValidator.controls['typeEtape'].value === "Tache") {
      console.log("tache" + this.etapeTache.controls['tacheTitre'].value);
      this.etape = {
        ...this.etape,
        titre: this.etapeTache.controls['tacheTitre'].value,
        question: this.etapeTache.controls['question'].value,
        reponse: this.etapeTache.controls['reponse'].value,
        indice: this.etapeTache.controls['indice'].value,
        pointsPerdus: this.etapeTache.controls['pointsPerdus'].value,
        pointsGagnes: this.etapeTache.controls['pointsGagnes'].value,
        typeEtape: TypeEtape.Tache,
        isValide: this.etapeTache.valid && this.typeEtapeValidator.valid
      }
    } else {
      console.log("else");
      this.etape = {
        ...this.etape,
        typeEtape: TypeEtape.NonDefinie,
        isValide: false
      }
    }
  }
}
