import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  login: string = "coucou";

  constructor(public auth:AngularFireAuth) { }

  ngOnInit(): void {
  }

  updateProfile() {

  }
}
