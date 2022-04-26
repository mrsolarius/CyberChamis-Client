import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./app-views/home/home.component";
import {ExploreComponent} from "./app-views/explore/explore.component";

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent, data:{animation: 'fadeInOut'}},
  {path:'explore', component:ExploreComponent, data:{animation: 'fadeInOut'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
