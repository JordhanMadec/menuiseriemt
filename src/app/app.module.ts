import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PartnersComponent } from './partners/partners.component';
import { ServicesComponent } from './services/services.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PersonComponent } from './contact/person/person.component';
import { AlbumComponent } from './album/album.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { ScrollSpyModule,  } from 'ng2-scrollspy';
import { NgsRevealModule } from 'ng2-scrollreveal';
import {PageSliderModule} from 'ng2-page-slider';
import { LegalsComponent } from './legals/legals.component';
import { SvgIconsComponent } from './svg-icons/svg-icons.component';
import { SvgIconsDefinitionsComponent } from './svg-icons/svg-icons-definitions/svg-icons-definitions.component';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'album/:id', component: AlbumComponent},
  {path: 'mentions_legales', component: LegalsComponent}
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
    SvgIconsComponent,
    SvgIconsDefinitionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PageScrollModule,
    RouterModule.forRoot(APP_ROUTES),
    Ng2BootstrapModule,
    ScrollSpyModule.forRoot(),
    NgsRevealModule.forRoot(),
    PageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
