import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './home/header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PartnersComponent } from './home/partners/partners.component';
import { ServicesComponent } from './home/services/services.component';
import { GalleryComponent } from './home/gallery/gallery.component';
import { PersonComponent } from './home/contact/person/person.component';
import { AlbumComponent } from './album/album.component';
import { HomeComponent } from './home/home.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { ScrollSpyModule,  } from 'ng2-scrollspy';
import { NgsRevealModule } from 'ng2-scrollreveal';
import {PageSliderModule} from 'ng2-page-slider';
import { LegalsComponent } from './legals/legals.component';
import { SvgIconsComponent } from './svg-icons/svg-icons.component';
import { SvgIconsDefinitionsComponent } from './svg-icons/svg-icons-definitions/svg-icons-definitions.component';
import { ClientComponent } from './home/client/client.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

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
    SvgIconsDefinitionsComponent,
    ClientComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PageScrollModule,
    Ng2BootstrapModule,
    ScrollSpyModule.forRoot(),
    NgsRevealModule.forRoot(),
    PageSliderModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
