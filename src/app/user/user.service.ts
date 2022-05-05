import { Injectable } from '@angular/core';
import {ChamiRestControllerService} from "../api/services/chami-rest-controller.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ChamiDto} from "../api/models";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cm : ChamiRestControllerService) { }

  createChami(auth : AngularFireAuth){  // create a chami
    auth.currentUser.then(user => {
      let chami : ChamiDto= {
        username: user?.displayName!,
        idGoogle: user?.uid,
      };
      this.cm.createChami({body:chami}).subscribe(res => {
        console.log(res);
      });
    });
  }

/*  getChamis(auth : AngularFireAuth){  // get la liste des chamis
    auth.currentUser.then(() => {
      this.cm.getChamis().subscribe(res => {
        console.log(res);
      });
    });
  }*/

  /*async getChamis(auth : AngularFireAuth) {
    let chami : ChamiDto | undefined;
    await auth.currentUser.then(user => {
      this.cm.getChamis().subscribe(chamis => {
        const chamiTab = chamis.filter(chami => chami.idGoogle === user?.uid);
        if (chamiTab.length > 0) {
          chami = chamiTab.pop();
        }
      })
    });
    return chami;
  }*/

  async getUsername(auth : AngularFireAuth, login : String) {
    let chami : ChamiDto;
    const user = await auth.currentUser
    console.log("hello");
    console.log("user id -> ",user?.uid);
    this.cm.getByIdGoogle({idGoogle : user?.uid!}).pipe().subscribe(value => {
      chami = value;
      console.log("coucou -> ", chami);
      console.log("ce que je veux recup -> ",chami.username);
      login = chami.username!;
    });
  }

  isAlreadyChami(auth : AngularFireAuth) : void { // check si le user est déjà dans la liste des chamis
    auth.currentUser.then(user => {
      this.cm.getChamis().subscribe(chamis => {
        console.log("uid -> ",user?.uid);
        const chami = chamis.filter(chami => chami.idGoogle === user?.uid);
        if (chami.length > 0) {
          console.log("ress present -> ",chami);
        } else {
          console.log("ress pas present -> ",chami);
          this.createChami(auth);
        }
    });
    });
  }

}
