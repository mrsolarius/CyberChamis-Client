import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateEtapeService, EtapeForm, TypeEtape} from "../create-etape.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {CreateIndiceService, IndiceForm} from "../create-indice.service";

@Component({
  selector: 'app-create-etape',
  templateUrl: './create-etape.component.html',
  styleUrls: ['../create.component.scss'],
  providers: [CreateIndiceService]
})
export class CreateEtapeComponent implements OnInit {
  @Input('etape') etape!: EtapeForm;

  typeEtapeValidator: FormGroup;
  etapeIndication: FormGroup;
  etapeTache: FormGroup;
  innerWidth: number=1080;
  indices: IndiceForm[] = [];

  constructor(private _formBuilder: FormBuilder, private createEtapeService: CreateEtapeService, private createIndiceService: CreateIndiceService) {
    this.typeEtapeValidator = this._formBuilder.group({
      typeEtape: new FormControl('', Validators.required)
    })
    this.etapeIndication = this._formBuilder.group({
      indicationTitre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      indicationDescription: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1024)]],
      indication: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
    });
    this.etapeTache = this._formBuilder.group({
      tacheTitre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      tacheDescription: ['', [ Validators.minLength(10), Validators.maxLength(255)]],
      question: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(360)]],
      reponse: ['', [Validators.required, Validators.min(1), Validators.maxLength(50)]],
      pointsGagnes: ['1', [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.etape) {
      if(this.etape.typeEtape === TypeEtape.Indication) {
        this.typeEtapeValidator.controls['typeEtape'].setValue("Indication");
      }else if (this.etape.typeEtape === TypeEtape.Tache) {
        this.typeEtapeValidator.controls['typeEtape'].setValue("Tache");
      }else {
        this.typeEtapeValidator.controls['typeEtape'].setValue("NonDefinie");
      }
      this.etapeIndication.controls['indicationTitre'].setValue(this.etape.titre);
      this.etapeIndication.controls['indication'].setValue(this.etape.indication);
      this.etapeTache.controls['tacheTitre'].setValue(this.etape.titre);
      this.etapeTache.controls['question'].setValue(this.etape.question);
      this.etapeTache.controls['reponse'].setValue(this.etape.reponse);
      this.etapeTache.controls['pointsGagnes'].setValue(this.etape.pointsGagnes);
    }

    //Obs de type d'étape
    this.typeEtapeValidator.valueChanges.subscribe(() => {
      this.updateEtape();
      this.createEtapeService.edit(this.etape.numero, this.etape);
    });

    //Obs de l'indication
    this.etapeIndication.valueChanges.subscribe(() => {
      this.updateEtape();
      this.createEtapeService.edit(this.etape.numero, this.etape);
    });

    //Obs de la tache
    this.etapeTache.valueChanges.subscribe(() => {
      this.updateEtape();
      this.createEtapeService.edit(this.etape.numero, this.etape);
    });

    //Obs de l'indice
    this.createIndiceService.get().subscribe(indices => {
      this.indices = indices;
      this.updateEtape();
      this.createEtapeService.edit(this.etape.numero, this.etape);
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
    if (this.typeEtapeValidator.controls['typeEtape'].value === "Indication") {
      this.etape = {
        ...this.etape,
        titre: this.etapeIndication.controls['indicationTitre'].value,
        description: this.etapeIndication.controls['indication'].value,
        indication: this.etapeIndication.controls['indication'].value,
        typeEtape: TypeEtape.Indication,
        isValide: this.etapeIndication.valid && this.typeEtapeValidator.valid
      }
    } else if (this.typeEtapeValidator.controls['typeEtape'].value === "Tache") {
      this.etape = {
        ...this.etape,
        titre: this.etapeTache.controls['tacheTitre'].value,
        description: this.etapeTache.controls['tacheDescription'].value,
        question: this.etapeTache.controls['question'].value,
        reponse: this.etapeTache.controls['reponse'].value,
        indices: this.indices,
        pointsGagnes: this.etapeTache.controls['pointsGagnes'].value,
        typeEtape: TypeEtape.Tache,
        isValide: this.checkIndiceValide() && this.etapeTache.valid && this.typeEtapeValidator.valid
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

  getIndiceObservable() {
    return this.createIndiceService.get();
  }

  drop(event: CdkDragDrop<IndiceForm[], any>) {
    this.createIndiceService.move(event.previousIndex, event.currentIndex);
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addEtape() {
    this.createIndiceService.addNew();
  }

  trackById(number: number, item: IndiceForm) {
    return item.id;
  }

  delete(numero: number) {
    this.createIndiceService.remove(numero);
  }

  addIndice() {
    this.createIndiceService.addNew();
  }

  checkIndiceValide() {
    return this.indices.reduce((acc, curr) => {
      if (!acc) {
        return false;
      } else {
        return curr.isValide;
      }
    }, true);
  }
}
