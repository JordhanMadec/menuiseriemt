import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from '../../../models/invoice';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { DatabaseService } from '../../../services/database.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.scss']
})
export class CustomerInvoiceComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  private routeSubscription: Subscription;

  public user: User;
  public invoice: Invoice;
  private invoiceId: string;
  public invoiceUrl: string;

  constructor(private cd: ChangeDetectorRef,
              private authService: AuthService,
              private databaseService: DatabaseService,
              private storageService: StorageService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.invoiceId = params['invoiceId'];
    });

    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        this.cd.detectChanges();

        if (!user || !this.invoiceId ) {
          return;
        }

        this.databaseService.getUserInvoice(this.user.id, this.invoiceId).then(
          (invoice: Invoice) => {
            this.invoice = invoice;
            this.cd.detectChanges();

            this.storageService.getInvoiceUrl(this.invoice.url).then(url => {
              this.invoiceUrl = url;
              this.cd.detectChanges();
            });
          }
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
