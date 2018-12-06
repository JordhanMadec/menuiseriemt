import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private ngZone: NgZone) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      switchMap(user => this.authService.currentUser),
      map((user: User) => {
        console.log(user)
        if (!user || !user.isAdmin) {
          this.ngZone.run(() => this.router.navigate(['login']));
          return false;
        }

        return true;
      })
    );
  }
}
