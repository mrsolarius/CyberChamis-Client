import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
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

  etapeCommun: FormGroup;
  etapeIndication: FormGroup;
  etapeTache: FormGroup;
  innerWidth: number=1080;
  indices: IndiceForm[] = [];
  private file: File|null=null;

  constructor(private _formBuilder: FormBuilder, private createEtapeService: CreateEtapeService, private createIndiceService: CreateIndiceService) {
    this.etapeCommun = this._formBuilder.group({
      typeEtape: new FormControl('', [Validators.required, this.isEmptySelected]),
      titre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      description: ['', [Validators.minLength(3), Validators.maxLength(255)]],
      image: ['', [Validators.pattern(/\.(jpe?g|png|gif|svg)$/i),Validators.required]],
    })
    this.etapeIndication = this._formBuilder.group({
      indication: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1024)]],
    });
    this.etapeTache = this._formBuilder.group({
      question: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(360)]],
      reponse: ['', [Validators.required, Validators.min(1), Validators.maxLength(50)]],
      pointsGagnes: ['1', [Validators.required, Validators.min(1), Validators.max(10)]],
    });
    this.etapeTache.controls['pointsGagnes'].setValue(1);
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.etape) {
      if(this.etape.typeEtape === TypeEtape.Indication) {
        this.etapeCommun.controls['typeEtape'].setValue("Indication");
      }else if (this.etape.typeEtape === TypeEtape.Tache) {
        this.etapeCommun.controls['typeEtape'].setValue("Tache");
      }else {
        this.etapeCommun.controls['typeEtape'].setValue("NonDefinie");
      }
      this.etapeCommun.controls['titre'].setValue(this.etape.titre);
      this.etapeCommun.controls['description'].setValue(this.etape.description);
      this.etapeIndication.controls['indication'].setValue(this.etape.indication);
      this.etapeTache.controls['question'].setValue(this.etape.question);
      this.etapeTache.controls['reponse'].setValue(this.etape.reponse);
      this.etapeTache.controls['pointsGagnes'].setValue(this.etape.pointsGagnes);
      this.file = this.etape.stepImg;
    }

    //Obs de type d'étape
    this.etapeCommun.valueChanges.subscribe(() => {
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
    if (this.etapeCommun.controls['typeEtape'].value === "Indication") {
      if (this.etapeIndication.controls[controlName]) {
        return this.etapeIndication.controls[controlName].hasError(errorName);
      }
    } else if (this.etapeCommun.controls['typeEtape'].value === "Tache") {
      if (this.etapeTache.controls[controlName]) {
        return this.etapeTache.controls[controlName].hasError(errorName);
      }
    }
    return false;
  }

  checkCommonEtape(controlName: string, errorName: string) {
    return this.etapeCommun.controls[controlName].hasError(errorName);
  }

  checkEmpty(){
    return this.etapeCommun.controls['typeEtape'].value === "NonDefinie";
  }


  updateEtape() {
    if (this.etapeCommun.controls['typeEtape'].value === "Indication") {
      this.etape = {
        ...this.etape,
        titre: this.etapeCommun.controls['titre'].value,
        description:this.etapeCommun.controls['description'].value,
        indication: this.etapeIndication.controls['indication'].value,
        typeEtape: TypeEtape.Indication,
        isValide: this.etapeIndication.valid && this.etapeCommun.valid,
        stepImg: this.file
      }
    } else if (this.etapeCommun.controls['typeEtape'].value === "Tache") {
      this.etape = {
        ...this.etape,
        titre: this.etapeCommun.controls['titre'].value,
        description:this.etapeCommun.controls['description'].value,
        question: this.etapeTache.controls['question'].value,
        reponse: this.etapeTache.controls['reponse'].value,
        indices: this.indices,
        pointsGagnes: this.etapeTache.controls['pointsGagnes'].value,
        typeEtape: TypeEtape.Tache,
        isValide: this.checkIndiceValide() && this.etapeTache.valid && this.etapeCommun.valid,
        stepImg: this.file
      }
    } else {
      this.etape = {
        ...this.etape,
        titre: this.etapeCommun.controls['titre'].value,
        description:this.etapeCommun.controls['description'].value,
        typeEtape: TypeEtape.NonDefinie,
        isValide: false,
        stepImg: this.file
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

  isEmptySelected(control: AbstractControl): ValidationErrors | null{
    if(control.value === "NonDefinie"){
      return {'required': true};
    }else {
      return null;
    }
  }

  onFileChange(file: HTMLInputElement) {
    if (file != null) {
      if (file.files!.length > 0) {
        this.file = file.files![0];
      }
    }
  }
}
