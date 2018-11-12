import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

  constructor(private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onSelectNavItem(value: string) {
    if (value === this.selectedNavItem) { return; }

    this.selectedNavItem = value;

    switch (value) {
      case 'accueil':
        this.router.navigate(['/espace-client']);
        break;
      case 'factures':
        break;
      case 'suivi-chantier':
        break;
      case 'infos-perso':
        break;
      default:
        this.router.navigate(['/espace-client']);
    }

    this.cd.detectChanges();
  }
}
