import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AlbumComponent} from './album/album.component';
import {LegalsComponent} from './legals/legals.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './login/reset-password/reset-password.component';
import {CustomerAreaHomeComponent} from './customer-area/customer-area-home/customer-area-home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [NotAuthGuard]},
  {path: 'home', redirectTo: '/'},
  {path: 'album/:id', component: AlbumComponent, canActivate: [NotAuthGuard]},
  {path: 'mentions_legales', component: LegalsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NotAuthGuard]},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard]},
  {path: 'espace-client', component: CustomerAreaHomeComponent, canActivate: [AuthGuard]},
  // default
  {path: '**', redirectTo: '/'},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
