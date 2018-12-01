import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInvoiceComponent } from './customer-area/customer-invoices/customer-document/customer-invoice.component';
import { CustomerQuoteComponent } from './customer-area/customer-invoices/customer-document/customer-quote.component';
import { CustomerInvoicesComponent } from './customer-area/customer-invoices/customer-invoices.component';
import { CustomerProfileComponent } from './customer-area/customer-profile/customer-profile.component';
import { CustomerProjectComponent } from './customer-area/customer-projects/customer-project/customer-project.component';
import { CustomerProjectsComponent } from './customer-area/customer-projects/customer-projects.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AlbumComponent} from './album/album.component';
import {LegalsComponent} from './legals/legals.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './login/reset-password/reset-password.component';
import {CustomerHomeComponent} from './customer-area/customer-home/customer-home.component';
import { SignupComponent } from './login/signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [NotAuthGuard]},
  {path: 'home', redirectTo: '/'},
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
        {path: ':projectId', component: CustomerProjectComponent},
    ]},
    {path: 'factures', children: [
      {path: '', component: CustomerInvoicesComponent},
      {path: ':invoiceId', component: CustomerInvoiceComponent},
    ]},
    {path: 'devis/:quoteId', component: CustomerQuoteComponent}
  ]},
  // default
  {path: '**', redirectTo: '/'},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}