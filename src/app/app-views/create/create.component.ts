import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {CreateEtapeService, EtapeForm} from "./create-etape.service";
import {debounceTime, distinctUntilChanged, finalize, Observable, switchMap, tap} from "rxjs";
import {MetroboliliteService} from "../../api-metro/metrobolilite.service";
import {GeoJSON} from "geojson";
import {castFeatureStopToArretDto, FeatureStop} from "../../api-metro/models/stops";
import {filter, map} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {DefiCreateDto} from "../../api/models/defi-create-dto";


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
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  //Autocomplete arrets de bus
  minSearchLength: number = 2;
  stops: FeatureStop[] = [];
  selectedStop: FeatureStop|null = null;
  isLoading: boolean = false;

  // variable de vue
  action: any = "";
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  etapes: FormGroup[] = [];

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private etapeService: CreateEtapeService,
              private metro: MetroboliliteService
  ) {

    this.firstFormGroup = this._formBuilder.group({
      titre: ['', [Validators.required, Validators.maxLength(45), Validators.minLength(5)]],
      minidescription: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.maxLength(1024), Validators.minLength(50)]],
      arret: ['', [Validators.required,this.isArretSelected.bind(this)]],
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

    this.etapeService.get().subscribe((etapes: EtapeForm[]) => {
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
    this.firstFormGroup.controls['arret'].valueChanges.pipe(
      filter(value => value.length >= this.minSearchLength),
      map(value => value.trim().toLowerCase()),
      distinctUntilChanged(),
      debounceTime(1000),
      tap(()=>{
        this.selectedStop = null;
        this.stops = [];
        this.isLoading = true;
      }),
      switchMap(value => this.metro.getPoints({
          types: "stops",
          query: value
        }).pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
      )
    ).subscribe((points: GeoJSON) => {
      if (points.type === "FeatureCollection") {
        this.stops = points.features
          .map((o) => (<FeatureStop>o))
          //Supression des arret qui on le même nom et la même ville
          .filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.properties.name === value.properties.name && t.properties.city === value.properties.city
            )));
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  submitForm() {
    if(this.firstFormGroup.invalid || this.firstFormGroup.pristine || this.secondFormGroup.invalid || this.secondFormGroup.pristine){
      return;
    }
    if(this.selectedStop == null){
      this.firstFormGroup.controls['arret'].setErrors(null);
      return;
    }

    const formDTO : DefiCreateDto = {
      arret:castFeatureStopToArretDto(this.selectedStop),
    }
  }

  openSnackBar(){
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
    this.etapeService.move(event.previousIndex, event.currentIndex);
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  getEtapesObservable(): Observable<EtapeForm[]> {
    return this.etapeService.get();
  }

  addEtape() {
    this.etapeService.addNew();
  }

  trackById(number: number, item: EtapeForm) {
    return item.id;
  }

  delete(numero: number) {
    this.etapeService.remove(numero);
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    //get theleced id
    const id = event.option.id;
    const selectedStop = this.stops.find((stop) => stop.properties.id === id);
    this.selectedStop = typeof selectedStop === 'undefined' ? null : selectedStop;
    this.firstFormGroup.controls['arret'].setErrors(null)
  }

  isArretSelected(): ValidationErrors | null {
    if (this.selectedStop === null) {
      return {'notfound': true};
    }else {
      return null;
    }
  }
}
