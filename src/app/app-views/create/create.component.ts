import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

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

  titre!:string;
  description!:string;
  arret!:string;
  dureeDefi!:Number;
  nombreEtape!: Number;
  totalPoints!:Number;
  listeTags: string[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  nombreTotalEtapes = new FormControl(undefined);

  nbEtapes!: number;
  etapes = Array(this.nbEtapes).fill(0).map((x,i)=>i);

  // variable de vue
  action:any="";
  messageFi:any ="Créer mon défi";
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar


  ) {
    this.firstFormGroup = this._formBuilder.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      arret: ['', [Validators.required]],
      duree: ['', [Validators.required, Validators.min(1)]],
      //to do pb sur le pattern, il le considère juste alors qu'il ne le devrait pas
      listeTags:['',[Validators.pattern(/[a-zA-Z ]*/g)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      nbEtapes: ['0', [Validators.required,Validators.min(1)]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', [Validators.required]],
    });

    //ajout des arrêt de bus depuis le json de l'api
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

 /* constructor(private cm : ChamiRestControllerService) {
    this.cm.getChamis().subscribe(data => {
      this.chamis = data;
    });
  }
*/
  ngOnInit() {


  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open("Ton défi est créé !", "",{
      duration: 3000,
      panelClass: ['mat-toolbar', 'green-snackbar','snack-up']});


  }

  checkError(controlName: string, errorName: string){
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }

  checkError2(controlName: string, errorName: string){
    return this.secondFormGroup.controls[controlName].hasError(errorName);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
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

}
