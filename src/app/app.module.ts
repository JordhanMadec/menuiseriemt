import { RouterModule, Routes } from "@angular/router";

import { AboutComponent } from "./home/about/about.component";
import { AlbumComponent } from "./album/album.component";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { ContactComponent } from "./home/contact/contact.component";
import { FooterComponent } from "./home/footer/footer.component";
import { FormsModule } from "@angular/forms";
import { GalleryComponent } from "./home/gallery/gallery.component";
import { HeaderComponent } from "./home/header/header.component";
import { HomeComponent } from "./home/home.component";
import { HttpModule } from "@angular/http";
import { LegalsComponent } from "./legals/legals.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { NgModule } from "@angular/core";
import { NgsRevealModule } from "ngx-scrollreveal";
import { NgxPageScrollModule } from "ngx-page-scroll";
import { PartnersComponent } from "./home/partners/partners.component";
import { PersonComponent } from "./home/contact/person/person.component";
import { RgeBadgeComponent } from "./rge/rge-badge/rge-badge.component";
import { RgeModalComponent } from "./rge/rge-modal/rge-modal.component";
import { ScrollSpyModule } from "ngx-scrollspy";
import { ServicesComponent } from "./home/services/services.component";
import { environment } from "../environments/environment";

const APP_ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "album/:id", component: AlbumComponent },
  { path: "mentions_legales", component: LegalsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    PartnersComponent,
    ServicesComponent,
    GalleryComponent,
    PersonComponent,
    AlbumComponent,
    HomeComponent,
    LegalsComponent,
    RgeBadgeComponent,
    RgeModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    NgxPageScrollModule,
    ScrollSpyModule.forRoot(),
    NgsRevealModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
