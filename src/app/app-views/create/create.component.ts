import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {CreateEtapeService, EtapeForm} from "./create-etape.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})

export class CreateComponent implements OnInit {
  innerWidth: number = 1920;

  //Tags list for chips
  listeTags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // variable de vue
  action: any = "";
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  etapes: FormGroup[] = [];

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private etapeService: CreateEtapeService
  ) {

    this.firstFormGroup = this._formBuilder.group({
      titre: ['', [Validators.required, Validators.maxLength(45), Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(10)]],
      arret: ['', [Validators.required]],
      duree: ['1', [Validators.required, Validators.min(1)]],
      //to do pb sur le pattern, il le considère juste alors qu'il ne le devrait pas
      listeTags: ['', [Validators.pattern(/[a-zA-Z ]*/g)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      etapes: new FormControl(null),
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', [Validators.required]],
    });

    this.etapeService.getEtapes().subscribe((etapes: EtapeForm[]) => {
      const isValid = etapes.reduce((acc, etape) => {
        if (!acc) {
          return false;
        } else {
          return etape.isValide;
        }
      }, true);
      if (isValid) {
        this.secondFormGroup.controls['etapes'].setErrors(null);
        this.secondFormGroup.controls['etapes'].setValue(etapes);
      } else {
        this.secondFormGroup.controls['etapes'].setErrors({'invalid': true});
      }
    });

    /*//ajout des arrêt de bus depuis le json de l'api
    let lstarret  = ''
    fetch('https://data.mobilites-m.fr/api/points/json?types=stops')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        lstarret=myJson
        console.log(lstarret)
      });

    /*lstarret.foreach(function(arret){console.log(arret.name)});*/


  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  openSnackBar() {
    this._snackBar.open("Ton défi est créé !", "", {
      duration: 3000,
      panelClass: ['mat-toolbar', 'green-snackbar', 'snack-up']
    });
  }

  checkError(controlName: string, errorName: string) {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }

  checkError2(controlName: string, errorName: string) {
    return this.secondFormGroup.controls[controlName].hasError(errorName);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.listeTags.filter((v) => v === value)?.length === 0) {
        this.listeTags.push(value.trim());
      }
    }
    if (input) {
      input.value = '';
    }
  }


  remove(mot: string): void {
    const index = this.listeTags.indexOf(mot);

    if (index >= 0) {
      this.listeTags.splice(index, 1);
    }
  }

  addForm($event: FormGroup, index: number) {
    console.log($event)
    this.etapes[index] = $event;
    this.secondFormGroup.controls['etapes'].setErrors(null);
    for (let i = 0; i < this.etapes.length; i++) {
      if (this.etapes[i] !== undefined) {
        if (this.etapes[i].invalid || this.etapes[i].pristine) {
          this.secondFormGroup.controls['etapes'].setErrors({'invalid': true});
        }
      }
    }
  }

  checkEtapeErrors(index: number): boolean {
    if (this.etapes[index] == null) {
      return false;
    }
    return this.etapes[index].invalid;
  }

  drop(event: CdkDragDrop<EtapeForm[]>) {
    console.log("drop", event)
    this.etapeService.moveEtape(event.previousIndex, event.currentIndex);
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  getEtapesObservable(): Observable<EtapeForm[]> {
    return this.etapeService.getEtapes();
  }

  addEtape() {
    this.etapeService.addNewEtape();
  }

  trackById(number: number, item: EtapeForm) {
    return item.id;
  }

  delete(numero: number) {
    this.etapeService.removeEtape(numero);
  }
}
