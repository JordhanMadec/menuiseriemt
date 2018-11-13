import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent implements OnInit {

  @Input() user: User;

  public selectedNavItem = 'accueil';

  constructor(private router: Router, private cd: ChangeDetectorRef, private ngZone: NgZone) { }

  ngOnInit() {
    switch (this.router.url) {
      case '/espace-client':
        this.selectedNavItem = 'accueil';
        break;
      case '/espace-client/factures':
        this.selectedNavItem = 'factures';
        break;
      case '/espace-client/suivi-chantier':
        this.selectedNavItem = 'suivi-chantier';
        break;
      case '/espace-client/profil':
        this.selectedNavItem = 'profil';
        break;
    }
  }

  onSelectNavItem(value: string) {
    if (value === this.selectedNavItem) { return; }

    this.selectedNavItem = value;

    let targetUrl = '';

    switch (value) {
      case 'accueil':
        targetUrl = '/espace-client';
        break;
      case 'factures':
        break;
      case 'suivi-chantier':
        break;
      case 'profil':
        targetUrl = '/espace-client/profil';
        break;
      default:
        targetUrl = '/espace-client'
    }

    this.ngZone.run(() => this.router.navigate([targetUrl]));

    this.cd.detectChanges();
  }
}
