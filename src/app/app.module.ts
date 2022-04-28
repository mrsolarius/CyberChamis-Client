import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TopBarComponent} from "./app-bars/top-bar/top-bar.component";
import {NavBarComponent} from "./app-bars/nav-bar/nav-bar.component";
import { HomeComponent } from './app-views/home/home.component';
import {MatCardModule} from "@angular/material/card";
import { ExploreComponent } from './app-views/explore/explore.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {ApiModule} from "./api/api.module";
import {HttpClientModule} from "@angular/common/http";
import { ChamisComponent } from './chamis/chamis.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {MaterialModule} from '../material.module';
import { DefiComponent } from './components/defi/defi.component';
import { AppMapComponent } from './app-map/app-map.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { DefisComponent } from './components/defis/defis.component';
import { ProfileComponent } from './app-views/profile/profile.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    NavBarComponent,
    HomeComponent,
    ExploreComponent,
    ChamisComponent,
    ExploreComponent,
    DefiComponent,
    AppMapComponent,
    DefisComponent,
    ProfileComponent,
  ],
  imports: [
    LeafletModule,
    ApiModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTreeModule,
    MatDividerModule,
    MatListModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
