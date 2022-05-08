import {NgModule} from '@angular/core';
import {NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./app-views/home/home.component";
import {ExploreComponent} from "./app-views/explore/explore.component";
import {ProfileComponent} from "./app-views/profile/profile.component";
import {AppLayoutComponent} from "./components/layout/app-layout/app-layout.component";
import {GameLayoutComponent} from "./app-views/game-layout/game-layout.component";
import {LeftRightAnimationStateService} from "./left-right-animation-state.service";
import {CreateComponent} from "./app-views/create/create.component";
import {DefiInfoComponent} from "./components/defi-info/defi-info.component";
import { SlidesDefisComponent } from './components/slides-defis/slides-defis.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: 'home', component: HomeComponent, data: {animation: 'fadeInOut'}},
      {path: 'explore', component: ExploreComponent, data: {animation: 'fadeInOut'}},
      {path: 'profile', component: ProfileComponent, data: {animation: 'fadeInOut'}},
      {path: 'create', component: CreateComponent, data: {animation: 'fadeInOut'}},
      {path: 'info/:id', component: DefiInfoComponent, data: {animation: 'fadeInOut'}},
      {path: 'create', component: CreateComponent, data: {animation: 'fadeInOut'}}
    ],
  },
  {path: 'game/:id',
    component: GameLayoutComponent,
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
