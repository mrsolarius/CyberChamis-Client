import { Injectable } from '@angular/core';
import {ChamiRestControllerService} from "../api/services/chami-rest-controller.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Chami} from "../api/models";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cm : ChamiRestControllerService) { }

  createChami(auth : AngularFireAuth){  // create a chami
    auth.currentUser.then(user => {
      let chami : Chami = {
        username: user?.displayName!,
        idGoogle: user?.uid,
      };
      this.cm.createChami({body:chami}).subscribe(res => {
        console.log(res);
      });
    });
  }

  getChamis(auth : AngularFireAuth){  // get la liste des chamis
    auth.currentUser.then(() => {
      this.cm.getChamis().subscribe(res => {
        console.log(res);
      });
    });
  }

  isAlreadyChami(auth : AngularFireAuth) : void { // check si le user est déjà dans la liste des chamis
    auth.currentUser.then(user => {
      this.cm.getChamis().subscribe(res => {
        console.log("uid -> ",user?.uid);
        const ress = res.filter(chami => chami.idGoogle === user?.uid);
        if (ress.length > 0) {
          console.log("ress present -> ",ress);
        } else {
          console.log("ress pas present -> ",ress);
          this.createChami(auth);
        }
    });
    });
  }

}
