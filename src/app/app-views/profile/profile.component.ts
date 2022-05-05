import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ChamiRestControllerService} from "../../api/services/chami-rest-controller.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  idGoogle!:string;
  angForm: FormGroup = this.createForm();

  constructor(public auth: AngularFireAuth, public cm: ChamiRestControllerService, private fb: FormBuilder) {
    auth.authState.subscribe(user => {
      if (user) {
        this.idGoogle = user?.uid;
        this.cm.getByIdGoogle({idGoogle: user?.uid!}).subscribe(value => {
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
    const model = {
      bio:this.angForm.controls['bio'].value,
      age:this.angForm.controls['age'].value,
      username:this.angForm.controls['username'].value
    }
    await firstValueFrom(this.cm.updateChami1({idGoogle: this.idGoogle, body: model}));
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
}
