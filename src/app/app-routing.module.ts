import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./app-views/home/home.component";
import {ExploreComponent} from "./app-views/explore/explore.component";
import {ProfileComponent} from "./app-views/profile/profile.component";
import {JeuDefiComponent} from "./components/jeu-defi/jeu-defi.component";
import {EtapeIndicativeComponent} from "./components/etape-indicative/etape-indicative.component";

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent, data:{animation: 'fadeInOut'}},
  {path:'explore', component:ExploreComponent, data:{animation: 'fadeInOut'}},
  {path:'profile', component:ProfileComponent, data:{animation: 'fadeInOut'}},
  {path:'mondefi',component:JeuDefiComponent, data:{animation: 'fadeInOut'}},
  {path:'etapind',component:EtapeIndicativeComponent, data:{animation: 'fadeInOut'}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
