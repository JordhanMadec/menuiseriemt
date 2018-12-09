import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from '../models/invoice';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  private routeSubscription: Subscription;

  public user: User;
  public document: Invoice;
  private documentId: string;
  public documentUrl: string;

  public tag: string;

  constructor(private cd: ChangeDetectorRef,
              private authService: AuthService,
              private databaseService: DatabaseService,
              private storageService: StorageService,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.documentId = params['invoiceId'];
    });

    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        this.cd.detectChanges();

        if (!user || !this.documentId ) {
          return;
        }

        this.databaseService.getUserInvoice(this.user.id, this.documentId).then(
          (invoice: Invoice) => {
            this.document = invoice;
            this.tag = invoice.done ? 'Payée' : 'À payer';
            this.cd.detectChanges();

            this.storageService.getInvoiceUrl(this.document.fileName).then(url => {
              this.documentUrl = url;
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
