import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, switchMap, take } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private ngZone: NgZone) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          this.ngZone.run(() => this.router.navigate(['login']));
        }

        return fromPromise(this.authService.refreshCurrentUser());
      }),
      map((user: User) => {
        if (user && user.isAdmin) {
          this.ngZone.run(() => this.router.navigate(['espace-admin']));
        }

        return true;
      })
    );
  }
}
