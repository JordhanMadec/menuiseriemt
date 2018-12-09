import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../models/invoice';
import { DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class InvoiceViewerComponent implements OnInit {

  public document: Invoice;
  private documentId: string;
  private customerId: string;
  public documentUrl: string;

  public tag: string;

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private storageService: StorageService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.documentId = this.route.snapshot.paramMap.get('invoiceId');

    this.databaseService.getUserInvoice(this.customerId, this.documentId).then(
      (invoice: Invoice) => {
        this.document = invoice;
        this.tag = invoice.done ? 'Payée' : 'À payer';
        this.cd.detectChanges();

        this.storageService.getInvoiceUrl(this.customerId, this.document.fileName).then(url => {
          this.documentUrl = url;
          this.cd.detectChanges();
        });
      }
    );
  }
}
