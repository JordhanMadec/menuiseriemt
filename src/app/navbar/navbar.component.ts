import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private routerSubscription: Subscription;
  private isAuthenticatedSubscription: Subscription;
  public isAuthenticated: boolean;
  public isHome = false;

  constructor(public router: Router, private authService: AuthService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    $('body').scrollspy({ target: '#navbar' });

    this.routerSubscription = this.router.events.subscribe(
      event => {
        this.isHome = this.router.url === '/';
        this.cd.detectChanges();
      }
    );

    this.isAuthenticatedSubscription = this.authService.isAuthenticatedEmitter.subscribe(
      res => {
        this.isAuthenticated = res;
        this.cd.detectChanges();
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  goToHome() {
    if (this.isAuthenticated === true) {
      this.router.navigate(['esapce-client']);
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnDestroy() {
    if (this.isAuthenticatedSubscription) {
      this.isAuthenticatedSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
