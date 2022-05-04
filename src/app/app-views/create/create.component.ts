import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EtapeDto} from "../../api/models/etape-dto";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  nombreEtape!: Number;
  totalPoints!:Number;
  listEtapes !: EtapeDto[];
  nombreTotalEtapes = new FormControl(undefined);
  myGroup!:any;
  arret!:string;
  action:any="";

  messageFi:any ="Créer mon défi";
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.myGroup = new FormGroup({
      firstName: new FormControl()
    });
  }

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
    this._snackBar.open("Ton défi est créé !", "");
  }


}
