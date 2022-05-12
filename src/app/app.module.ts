import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TopBarComponent} from "./components/layout/app-bars/top-bar/top-bar.component";
import {NavBarComponent} from "./components/layout/app-bars/nav-bar/nav-bar.component";
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GameComponent } from './components/game/game.component';
import { AppLayoutComponent } from './components/layout/app-layout/app-layout.component';
import { GameLayoutComponent } from './app-views/game-layout/game-layout.component';
import { GameBarComponent } from './components/layout/app-bars/game-bar/game-bar.component';
import { IndiceSheetComponent } from './components/layout/app-bars/game-bar/game-bar.component';
import { NotFoundComponent } from './app-views/not-found/not-found.component';
import { FinishComponent } from './components/finish/finish.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CreateComponent } from './app-views/create/create.component';
import { CreateEtapeComponent } from './app-views/create/create-etape/create-etape.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CreateIndiceComponent } from './app-views/create/create-indice/create-indice.component';
import { SlidesDefisComponent } from './components/slides-defis/slides-defis.component';
import { DefiInfoComponent } from './components/defi-info/defi-info.component';
import { CommentaireComponent } from './components/commentaire/commentaire.component';
import { RatingViewComponent } from './components/rating-view/rating-view.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import {LeafletMarkerClusterModule} from "@asymmetrik/ngx-leaflet-markercluster";
import { CommentUserComponent } from './components/comment-user/comment-user.component';
import { HistoCommentUserComponent } from './components/histo-comment-user/histo-comment-user.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TagTendanceComponent } from './components/tag-tendance/tag-tendance.component';
import { SingleLayoutComponent } from './components/layout/single-layout/single-layout.component';
import { DefisByTagComponent } from './app-views/defis-by-tag/defis-by-tag.component';
import { DefitrouveComponent } from './app-map/defitrouve/defitrouve.component';
import { ActiveAuthorComponent } from './components/active-author/active-author.component';


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
    GameComponent,
    AppLayoutComponent,
    GameLayoutComponent,
    GameBarComponent,
    CreateComponent,
    CreateEtapeComponent,
    CreateIndiceComponent,
    SlidesDefisComponent,
    IndiceSheetComponent,
    NotFoundComponent,
    FinishComponent,
    StarRatingComponent,
    DefiInfoComponent,
    CommentaireComponent,
    RatingViewComponent,
    AddCommentComponent,
    ProfileInfoComponent,
    TagTendanceComponent,
    HistoCommentUserComponent,
    SingleLayoutComponent,
    CommentUserComponent,
    DefisByTagComponent,
    DefitrouveComponent,
    ActiveAuthorComponent,
  ],
  imports: [
    DragDropModule,
    LeafletModule,
    LeafletMarkerClusterModule,
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
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
