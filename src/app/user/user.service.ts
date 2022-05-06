import {Injectable} from '@angular/core';
import {ChamiRestControllerService} from "../api/services/chami-rest-controller.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ChamiDto} from "../api/models";
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userId = new BehaviorSubject<number>(-1);

  constructor(private cm: ChamiRestControllerService, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        try {
          const chami = await firstValueFrom(this.cm.getByIdGoogle({idGoogle: user.uid}));
          this.userId.next(chami.id!);
        } catch (e) {
          const newUser = await this.createChami(user);
          this.userId.next(newUser.id!);
        }
      } else {
        this.userId.next(-1);
      }
    });
    this.getUserId().subscribe(id => {
        console.log("User id: " + id);
    })
  }

  async createChami(user: firebase.User) {  // create a chami
    const chamiName = user?.displayName!.substring(0, user.displayName!.indexOf(' ')).substring(0,20);
    let chami: ChamiDto = {
      username: chamiName,
      idGoogle: user?.uid,
      profileImg: user?.photoURL==null?undefined:user?.photoURL,
    }
    let id = 1;
    let chamiCreated = false;
    while (!chamiCreated) {
      try {
        chami = await firstValueFrom(this.cm.createChami({body: chami}));
        chamiCreated = true;
      } catch (e) {
        chami.username = chamiName + ' '+ id;
        id++;
      }
    }
    return chami;
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

  getUserId(): Observable<number> {
    return this.userId.asObservable();
  }

}
