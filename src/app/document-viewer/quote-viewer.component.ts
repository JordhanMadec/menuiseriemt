import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '../models/quote';
import { DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-customer-quote',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class QuoteViewerComponent implements OnInit {

  public document: Quote;
  private customerId: string;
  private documentId: string;
  public documentUrl: string;

  public tag: string;

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private storageService: StorageService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.documentId = this.route.snapshot.paramMap.get('quoteId');

    this.databaseService.getUserQuote(this.customerId, this.documentId).then(
      (quote: Quote) => {
        this.document = quote;
        this.tag = quote.done ? 'Signé' : 'À valider';
        this.cd.detectChanges();

        this.storageService.getQuoteUrl(this.customerId, this.document.fileName).then(url => {
          this.documentUrl = url;
          this.cd.detectChanges();
        });
      }
    );
  }
}
