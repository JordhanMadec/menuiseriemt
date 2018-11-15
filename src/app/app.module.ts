import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
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
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ScrollSpyModule } from 'ngx-scrollspy';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { LegalsComponent } from './legals/legals.component';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';
import { StorageService } from './services/storage.service';
import { SvgIconsComponent } from './shared/svg-icons/svg-icons.component';
import { SvgIconsDefinitionsComponent } from './shared/svg-icons/svg-icons-definitions/svg-icons-definitions.component';
import { ClientComponent } from './home/client/client.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { CustomerHomeComponent } from './customer-area/customer-home/customer-home.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { SignupComponent } from './login/signup/signup.component';
import { CheckboxComponent } from './shared/checkbox/checkbox.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CustomerHeaderComponent } from './navbar/customer-header/customer-header.component';
import { CustomerProfileComponent } from './customer-area/customer-profile/customer-profile.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { CustomerInvoicesComponent } from './customer-area/customer-invoices/customer-invoices.component';
import { ListItemComponent } from './shared/list-item/list-item.component';
import { CustomerInvoiceComponent } from './customer-area/customer-invoices/customer-invoice/customer-invoice.component';

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
    ResetPasswordComponent,
    CustomerHomeComponent,
    SignupComponent,
    CheckboxComponent,
    SpinnerComponent,
    CustomerHeaderComponent,
    CustomerProfileComponent,
    AlertMessageComponent,
    CustomerInvoicesComponent,
    ListItemComponent,
    CustomerInvoiceComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxPageScrollModule,
    ScrollSpyModule.forRoot(),
    NgsRevealModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FlexLayoutModule,
    PdfViewerModule,
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    AuthService,
    AlertService,
    DatabaseService,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
