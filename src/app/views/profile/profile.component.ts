import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ChamiRestControllerService} from "../../apis/api-local/services/chami-rest-controller.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {lastValueFrom} from "rxjs";
import {ChamiDto} from "../../apis/api-local/models/chami-dto";
import {GeolocService,getDistance} from "../../services/geoloc.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  idGoogle!:string;
  imgProfile!:string|null;
  angForm: FormGroup = this.createForm();
  id: number=-1;

  constructor(public auth: AngularFireAuth, public cm: ChamiRestControllerService, private fb: FormBuilder, private geolocService : GeolocService) {
    auth.authState.subscribe(user => {
      if (user) {
        this.idGoogle = user?.uid;
        this.imgProfile = user?.photoURL;
        this.cm.getByIdGoogle({idGoogle: user?.uid!}).subscribe(value => {
          this.id = value.id!;
          this.angForm.controls['username'].patchValue(value.username);
          this.angForm.controls['bio'].patchValue(value.bio);
          this.angForm.controls['age'].patchValue(value.age);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  async updateProfile() {
    const model : ChamiDto = {
      bio:this.angForm.controls['bio'].value,
      age:this.angForm.controls['age'].value,
      username:this.angForm.controls['username'].value,
      profileImg:this.imgProfile==null?undefined:this.imgProfile,
    }

    console.log("update profile",model)
    await lastValueFrom(this.cm.updateChami1({idGoogle: this.idGoogle, body: model}));
    this.angForm.reset();
    this.angForm.controls['username'].patchValue(model.username);
    this.angForm.controls['bio'].patchValue(model.bio);
    this.angForm.controls['age'].patchValue(model.age);
  }

  createForm() {
    return this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      age: ['', [Validators.min(13)]],
      bio: ['', [Validators.maxLength(255)]]
    });
  }

  checkError(controlName: string, errorName: string){
    return this.angForm.controls[controlName].hasError(errorName);
  }

  getAuthObs(){
    return this.auth.user;
  }

  getDistance(latitude: number, longitude: number, latitude2: number, longitude2: number) {
    return getDistance(latitude, longitude, latitude2, longitude2);
  }

  getLocObs() {
    return this.geolocService.getLocObs();
  }
}
