import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EtapeDto} from "../../api/models/etape-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChamiRestControllerService} from "../../api/services/chami-rest-controller.service";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";


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
              private _snackBar: MatSnackBar,
              private ds: DefiRestControllerService


  ) {
    this.myGroup = new FormGroup({
      firstName: new FormControl()
    });
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
