import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminClientsComponent } from './admin-area/admin-clients/admin-clients.component';
import { ClientDetailComponent } from './admin-area/admin-clients/client-detail/client-detail.component';
import { ClientWizardComponent } from './admin-area/admin-clients/client-wizard/client-wizard.component';
import { AdminHomeComponent } from './admin-area/admin-home/admin-home.component';
import { AdminProjectsComponent } from './admin-area/admin-projects/admin-projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { InvoiceViewerComponent } from './document-viewer/invoice-viewer.component';
import { QuoteViewerComponent } from './document-viewer/quote-viewer.component';
import { CustomerInvoicesComponent } from './customer-area/customer-invoices/customer-invoices.component';
import { CustomerProfileComponent } from './customer-area/customer-profile/customer-profile.component';
import { CustomerProjectsComponent } from './customer-area/customer-projects/customer-projects.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import {HomeComponent} from './homepage/home.component';
import {LoginComponent} from './login/login.component';
import {AlbumComponent} from './homepage/album/album.component';
import {LegalsComponent} from './homepage/legals/legals.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './login/reset-password/reset-password.component';
import {CustomerHomeComponent} from './customer-area/customer-home/customer-home.component';
import { SignupComponent } from './login/signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [NotAuthGuard]},
  {path: 'homepage', redirectTo: '/'},
  {path: 'album/:id', component: AlbumComponent, canActivate: [NotAuthGuard]},
  {path: 'mentions-legales', component: LegalsComponent},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: 'inscription', component: SignupComponent, canActivate: [NotAuthGuard]},
  {path: 'mot-de-passe-oublie', component: ForgotPasswordComponent, canActivate: [NotAuthGuard]},
  {path: 'nouveau-mot-de-passe/:userId', component: ResetPasswordComponent, canActivate: [AuthGuard]},
  {path: 'espace-client', canActivate: [AuthGuard], children: [
    {path: '', component: CustomerHomeComponent},
    {path: 'profil', component: CustomerProfileComponent},
    {path: 'suivi-chantier', children: [
        {path: '', component: CustomerProjectsComponent},
        {path: ':customerId/:projectId', component: ProjectDetailComponent},
    ]},
    {path: 'factures', children: [
      {path: '', component: CustomerInvoicesComponent},
      {path: ':invoiceId', component: InvoiceViewerComponent},
    ]},
    {path: 'devis/:quoteId', component: QuoteViewerComponent}
  ]},
  {path: 'espace-admin', canActivate: [AdminGuard], children: [
      {path: '', component: AdminHomeComponent},
      {path: 'clients', children: [
          {path: '', component: AdminClientsComponent},
          {path: ':customerId', component: ClientDetailComponent},
          {path: ':customerId/modifier', component: ClientWizardComponent},
      ]},
      {path: 'nouveau-client', component: ClientWizardComponent},
      {path: 'chantiers', children: [
          {path: '', component: AdminProjectsComponent},
          {path: ':customerId/:projectId', component: ProjectDetailComponent},
      ]},
  ]},
  // default
  {path: '**', redirectTo: '/'},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
