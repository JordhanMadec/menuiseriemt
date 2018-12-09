import { ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['../customer-header/customer-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {

  @Input() user: User;

  private routerSubscription: Subscription;

  public selectedNavItem;

  constructor(private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(
      event => {
        this.selectedNavItem = '';

        if (this.router.url.match('^/espace-admin$')) {
          this.selectedNavItem = 'accueil';
        }
        if (this.router.url.match('^/espace-admin/factures')) {
          this.selectedNavItem = 'factures';
        }
        if (this.router.url.match('^/espace-admin/chantiers')) {
          this.selectedNavItem = 'chantiers';
        }
        if (this.router.url.match('^/espace-admin/clients')) {
          this.selectedNavItem = 'clients';
        }

        this.cd.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
