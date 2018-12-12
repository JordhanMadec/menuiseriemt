import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { AboutComponent } from './homepage/about/about.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { HeaderComponent } from './homepage/header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PartnersComponent } from './homepage/partners/partners.component';
import { ServicesComponent } from './homepage/services/services.component';
import { GalleryComponent } from './homepage/gallery/gallery.component';
import { PersonComponent } from './homepage/contact/person/person.component';
import { AlbumComponent } from './homepage/album/album.component';
import { HomeComponent } from './homepage/home.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ScrollSpyModule } from 'ngx-scrollspy';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { LegalsComponent } from './homepage/legals/legals.component';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';
import { NotificationsService } from './services/notifications.service';
import { StorageService } from './services/storage.service';
import { SvgIconsComponent } from './shared/svg-icons/svg-icons.component';
import { SvgIconsDefinitionsComponent } from './shared/svg-icons/svg-icons-definitions/svg-icons-definitions.component';
import { ClientComponent } from './homepage/client/client.component';
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
import { AlertMessageComponent } from './shared/alert-message/alert-message.component';
import { CustomerInvoicesComponent } from './customer-area/customer-invoices/customer-invoices.component';
import { ListItemComponent } from './shared/list-item/list-item.component';
import { InvoiceViewerComponent } from './document-viewer/invoice-viewer.component';
import { CustomerProjectsComponent } from './customer-area/customer-projects/customer-projects.component';
import { PageTitleComponent } from './shared/page-title/page-title.component';
import { ProjectTimelineComponent } from './shared/project-timeline/project-timeline.component';
import { QuoteViewerComponent } from './document-viewer/quote-viewer.component';
import { AdminHomeComponent } from './admin-area/admin-home/admin-home.component';
import { AdminHeaderComponent } from './navbar/admin-header/admin-header.component';
import { AdminClientsComponent } from './admin-area/admin-clients/admin-clients.component';
import { UserWizardComponent } from './shared/user-wizard/user-wizard.component';
import { AdminProjectsComponent } from './admin-area/admin-projects/admin-projects.component';
import { ClientDetailComponent } from './admin-area/admin-clients/client-detail/client-detail.component';
import { ProjectDetailComponent } from './shared/project-detail/project-detail.component';
import { ProjectWizardComponent } from './admin-area/admin-projects/project-wizard/project-wizard.component';

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
    AlertMessageComponent,
    CustomerInvoicesComponent,
    ListItemComponent,
    InvoiceViewerComponent,
    CustomerProjectsComponent,
    PageTitleComponent,
    ProjectTimelineComponent,
    QuoteViewerComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    AdminClientsComponent,
    UserWizardComponent,
    AdminProjectsComponent,
    ClientDetailComponent,
    ProjectDetailComponent,
    ProjectWizardComponent,
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
    BsDropdownModule.forRoot(),
    NgSelectModule,
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    AdminGuard,
    AuthService,
    AlertService,
    DatabaseService,
    StorageService,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
