import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-customer-invoices',
  templateUrl: './customer-invoices.component.html',
  styleUrls: ['./customer-invoices.component.scss']
})
export class CustomerInvoicesComponent implements OnInit, OnDestroy {

  public user: User;
  private userSubscription: Subscription;

  public invoices: Invoice[];

  constructor(private cd: ChangeDetectorRef, private authService: AuthService, private databaseService: DatabaseService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        this.cd.detectChanges();

        if (user === null) {
          return;
        }

        this.databaseService.getUserInvoices(this.user.id).then(
          (invoices: Invoice[]) => {
            this.invoices = invoices;
            this.cd.detectChanges();
          }
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
