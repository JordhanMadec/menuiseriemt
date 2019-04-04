import { ChangeDetectorRef, Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Notif } from '../models/notif';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from '../services/notifications.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  private routerSubscription: Subscription;
  private isAuthenticatedSubscription: Subscription;
  private hasNotificationSubscription: Subscription;
  private userSubscription: Subscription;

  public user: User;

  public isAuthenticated: boolean;
  public isHome = false;

  public sidenavVisible = false;
  private smallScreen = false;

  public notifs: Notif[] = [];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sidenavVisible = window.matchMedia('(min-width: 992px').matches;
    this.smallScreen = window.matchMedia('(max-width: 992px').matches;
  }

  constructor(public router: Router,
              private authService: AuthService,
              private notificationService: NotificationsService,
              private cd: ChangeDetectorRef,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    $('body').scrollspy({ target: '#navbar' });

    this.onResize();

    this.sidenavVisible = window.matchMedia('(min-width: 992px').matches;

    this.routerSubscription = this.router.events.subscribe(
      event => {
        this.isHome = this.router.url === '/';
        if (this.smallScreen) {
          this.sidenavVisible = false;
        }

        this.cd.detectChanges();
      }
    );

    this.isAuthenticatedSubscription = this.authService.isAuthenticatedEmitter.subscribe(
      res => {
        this.isAuthenticated = res;
        this.cd.detectChanges();
      }
    );

    this.hasNotificationSubscription = this.notificationService.hasNotification.subscribe(
      (notifs: Notif[]) => {
        this.notifs = notifs;
        this.cd.detectChanges();
      }
    );

    this.userSubscription = this.authService.currentUser.subscribe(
      user => {
        this.user = user;
        this.cd.detectChanges();
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  goToHome() {
    if (this.isAuthenticated === true) {
      this.ngZone.run(() => this.router.navigate(['esapce-client']));
    } else {
      this.ngZone.run(() => this.router.navigate(['']));
    }
  }

  toggleSidenav() {
    this.sidenavVisible = !this.sidenavVisible;
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.isAuthenticatedSubscription) {
      this.isAuthenticatedSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.hasNotificationSubscription) {
      this.hasNotificationSubscription.unsubscribe();
    }
  }
}
