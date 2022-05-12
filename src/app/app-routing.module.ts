import {NgModule} from '@angular/core';
import {NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {ExploreComponent} from "./views/explore/explore.component";
import {ProfileComponent} from "./views/profile/profile.component";
import {AppLayoutComponent} from "./layout/app-layout/app-layout.component";
import {GameLayoutComponent} from "./views/game-layout/game-layout.component";
import {LeftRightAnimationStateService} from "./services/left-right-animation-state.service";
import {CreateComponent} from "./views/create/create.component";
import {DefiInfoComponent} from "./components/defi-page/defi-info/defi-info.component";
import {ProfileInfoComponent} from "./components/profile/profile-info/profile-info.component";
import {SingleLayoutComponent} from "./layout/single-layout/single-layout.component";
import {DefisByTagComponent} from "./views/defis-by-tag/defis-by-tag.component";


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
      {path: 'profile-info/:id', component: ProfileInfoComponent, data: {animation: 'fadeinOut'}}
    ],
  },
  {path: 'game/:id',
    component: GameLayoutComponent,
    data: {animation: 'leftRightAnimation'}
  },
  {
    path:'s',
    component:SingleLayoutComponent,
    children:[
      {path:'tag/:id',component: DefisByTagComponent}
    ]
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
