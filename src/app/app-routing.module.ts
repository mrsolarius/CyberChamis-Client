import {NgModule} from '@angular/core';
import {NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./app-views/home/home.component";
import {ExploreComponent} from "./app-views/explore/explore.component";
import {ProfileComponent} from "./app-views/profile/profile.component";
import {GameComponent} from "./app-views/game/game.component";
import {AppLayoutComponent} from "./components/layout/app-layout/app-layout.component";
import {GameLayoutComponent} from "./components/layout/game-layout/game-layout.component";
import {LeftRightAnimationStateService} from "./left-right-animation-state.service";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: 'home', component: HomeComponent, data: {animation: 'fadeInOut'}},
      {path: 'explore', component: ExploreComponent, data: {animation: 'fadeInOut'}},
      {path: 'profile', component: ProfileComponent, data: {animation: 'fadeInOut'}},
    ],
  },
  {path: 'game',
    component: GameLayoutComponent,
    children: [
      {path: 'test', component: GameComponent, data: {animation: 'fadeInOut'}}
    ],
    data: {animation: 'leftRightAnimation'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  lastRoute: string = '';
  constructor(private anim: LeftRightAnimationStateService,private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/game')) {
          if (!this.lastRoute.startsWith('/game')) {
            this.anim.counter--;
          }
        }else if (this.lastRoute.startsWith('/game')) {
          this.anim.counter++;
        }
        this.lastRoute = event.url;
      }
    });

  }
}
