import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

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

  updateProfile() {

  }
}
