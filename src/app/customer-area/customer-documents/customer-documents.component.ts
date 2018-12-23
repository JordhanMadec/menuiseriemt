import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DocumentType } from '../../models/document';
import { Invoice } from '../../models/invoice';
import { Quote } from '../../models/quote';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-customer-invoices',
  templateUrl: './customer-documents.component.html',
  styleUrls: ['./customer-documents.component.scss']
})
export class CustomerDocumentsComponent implements OnInit, OnDestroy {

  public user: User;
  private userSubscription: Subscription;

  public invoices: Invoice[];
  public quotes: Quote[];

  constructor(private cd: ChangeDetectorRef, private authService: AuthService, private databaseService: DatabaseService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        this.cd.detectChanges();

        if (!user) {
          return;
        }

        this.databaseService.getUserDocuments(this.user.id, DocumentType.INVOICE).then(
          (invoices: Invoice[]) => {
            this.invoices = invoices;
            this.cd.detectChanges();
          }
        );

        this.databaseService.getUserDocuments(this.user.id, DocumentType.QUOTE).then(
          (quotes: Quote[]) => {
            this.quotes = quotes;
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
