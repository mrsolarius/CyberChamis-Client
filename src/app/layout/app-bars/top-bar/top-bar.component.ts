import {Component, Input, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent implements OnInit {
  @Input() title: string = "";
  @Input() profile: boolean = false;
  @Input() search: boolean = false;
  @Input() backRoute: string | null = null;

  constructor(public auth : AngularFireAuth, public cham: UserService) { }

  loginButton(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.auth.signInWithPopup(provider);
  }

  logout(): void {
    this.auth.signOut();
  }

  ngOnInit(): void {
  }

}
