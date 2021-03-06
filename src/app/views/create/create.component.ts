import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {castToEtapeCreateDto, CreateEtapeService, EtapeForm, EtapeFormToSend} from "./create-etape.service";
import {debounceTime, distinctUntilChanged, finalize, Observable, switchMap, tap} from "rxjs";
import {MetroboliliteService} from "../../apis/api-metro/metrobolilite.service";
import {GeoJSON} from "geojson";
import {castFeatureStopToArretDto, FeatureStop} from "../../apis/api-metro/models/stops";
import {filter, map} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {DefiCreateDto} from "../../apis/api-local/models/defi-create-dto";
import {CreationRestControllerService} from "../../apis/api-local/services/creation-rest-controller.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FirefilesService} from "../../services/firefiles.service";


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
  selectedStop: FeatureStop | null = null;
  isSet: boolean = false;
  isLoading: boolean = false;

  //Etapes
  etapesData: EtapeForm[] = [];

  //id user
  idUser: number = -1;

  // variable de vue
  action: any = "";
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  etapes: FormGroup[] = [];
  private databaseKey: string = "defis";
  private file: File | null = null;
  isUploading: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private etapeService: CreateEtapeService,
              private metro: MetroboliliteService,
              private creationService: CreationRestControllerService,
              private router: Router,
              private auth: UserService,
              private fireFile: FirefilesService) {
    this.firstFormGroup = this._formBuilder.group({
      titre: ['', [Validators.required, Validators.maxLength(45), Validators.minLength(5)]],
      minidescription: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.maxLength(1024), Validators.minLength(50)]],
      arret: ['', [Validators.required, this.isArretSelected.bind(this)]],
      duree: ['1', [Validators.required, Validators.min(1)]],
      //to do pb sur le pattern, il le consid??re juste alors qu'il ne le devrait pas
      listeTags: ['', [Validators.pattern(/[a-zA-Z ]*/g)]],
      banniere: ['', [Validators.required, Validators.pattern(/\.(jpe?g|png|gif|svg)$/i)]],
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
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.etapeService.get().subscribe((etapes: EtapeForm[]) => this.etapesData = etapes);
    this.auth.getUserId().subscribe((id: number) => this.idUser = id);
    this.firstFormGroup.controls['arret'].valueChanges.pipe(
      filter(value => value.length >= this.minSearchLength),
      map(value => value.trim().toLowerCase()),
      distinctUntilChanged(),
      debounceTime(1000),
      tap(() => {
        if (!this.isSet)
          this.selectedStop = null;
        else
          this.isSet = false;
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
          //Supression des arret qui on le m??me nom et la m??me ville
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

  async submitForm() {
    console.log("submitForm");
    if (this.firstFormGroup.invalid || this.firstFormGroup.pristine || this.secondFormGroup.invalid || this.idUser === -1) {
      console.log("formulaire invalide")
      return;
    }
    console.log(this.selectedStop)
    if (this.selectedStop == null) {
      console.log("arret invalide")
      this.firstFormGroup.controls['arret'].setErrors(null);
      return;
    }

    if (this.etapesData.length === 0) {
      console.log("pas d'??tapes")
      this.secondFormGroup.controls['etapes'].setErrors({'invalid': true});
      return;
    }

    if (this.file === null) {
      console.log("pas de fichier")
      return;
    }

    this.isUploading= true;
    try {
      const img = await this.fireFile.savePhoto(await this.fireFile.compressImg(this.file),this.databaseKey);
      const sendEtape : Promise<EtapeFormToSend>[] = this.etapesData.map(async (etape)=>{
        let img = "";
        try{
          if (etape.stepImg !== null) {
            img = await this.fireFile.savePhoto(await this.fireFile.compressImg(etape.stepImg),this.databaseKey);
          }
        }catch(e){}
        const etapeToSend : EtapeFormToSend = {
          ...etape,
          stepImg:img
        }
        return etapeToSend;
      });

      const etapeToSendArray = await Promise.all(sendEtape);

      const formDTO: DefiCreateDto = {
        arret: castFeatureStopToArretDto(this.selectedStop),
        duree: this.firstFormGroup.controls['duree'].value,
        tags: this.listeTags,
        titre: this.firstFormGroup.controls['titre'].value,
        miniDescription: this.firstFormGroup.controls['minidescription'].value,
        description: this.firstFormGroup.controls['description'].value,
        etapes: etapeToSendArray.map(castToEtapeCreateDto),
        auteurId: this.idUser,
        img:img
      }

      console.log('forms',formDTO)

      this.creationService.createDefi1({body: formDTO}).subscribe(
        {
          next: (data) => {
            this.openSnackBar();
            this.router.navigate(['/info', data.id]);
            this.isUploading = false;
          },
          error: (err) => {
            console.log(err);
            this.isUploading = false;
          }
        }
      )
    } catch (e) {
      console.log("erreur lors de la sauvegarde des images")
      this.isUploading = false;
      return;
    }
  }

  openSnackBar() {
    this._snackBar.open("Ton d??fi est cr???? !", "", {
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
    let value = event.value.toLowerCase();
    value = value.toUpperCase();
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
    console.log(selectedStop);
    this.selectedStop = typeof selectedStop === 'undefined' ? null : selectedStop;
    console.log(this.selectedStop);
    this.isSet = true;
    this.firstFormGroup.controls['arret'].setErrors(null)
  }

  isArretSelected(): ValidationErrors | null {
    if (this.selectedStop === null) {
      return {'notfound': true};
    } else {
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
