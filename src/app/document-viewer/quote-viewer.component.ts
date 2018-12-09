import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quote } from '../models/quote';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-customer-quote',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class QuoteViewerComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  private routeSubscription: Subscription;

  public user: User;
  public document: Quote;
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
      this.documentId = params['quoteId'];
    });

    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        this.cd.detectChanges();

        if (!user || !this.documentId ) {
          return;
        }

        this.databaseService.getUserQuote(this.user.id, this.documentId).then(
          (quote: Quote) => {
            this.document = quote;
            this.tag = quote.done ? 'Signé' : 'À valider';
            this.cd.detectChanges();

            this.storageService.getQuoteUrl(this.document.fileName).then(url => {
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
