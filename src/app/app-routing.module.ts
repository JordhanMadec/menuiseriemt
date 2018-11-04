import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AlbumComponent} from './album/album.component';
import {LegalsComponent} from './legals/legals.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: '/'},
  {path: 'album/:id', component: AlbumComponent},
  {path: 'mentions_legales', component: LegalsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
