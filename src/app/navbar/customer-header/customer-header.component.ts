import { ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent implements OnInit, OnDestroy {

  @Input() user: User;

  private routerSubscription: Subscription;

  public selectedNavItem;

  constructor(private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(
      event => {
        this.selectedNavItem = '';

        if (this.router.url.match('^/espace-client$')) {
          this.selectedNavItem = 'accueil';
        }
        if (this.router.url.match('^/espace-client/(documents|factures|devis)')) {
          this.selectedNavItem = 'documents';
        }
        if (this.router.url.match('^/espace-client/suivi-chantier')) {
          this.selectedNavItem = 'suivi-chantier';
        }
        if (this.router.url.match('^/espace-client/profil')) {
          this.selectedNavItem = 'profil';
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
