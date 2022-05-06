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
  styleUrls: ['./create.component.scss']
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

  // variable de vue
  myGroup!:any;
  action:any="";
  messageFi:any ="Créer mon défi";
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar


  ) {
    this.myGroup = new FormGroup({
      firstName: new FormControl()
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
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open("Ton défi est créé !", "",{
      duration: 3000,
      panelClass: ['mat-toolbar', 'green-snackbar','snack-up']});


  }


}
