import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DocumentType } from '../../models/document';
import { Invoice } from '../../models/invoice';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-admin-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrls: ['./admin-invoices.component.scss']
})
export class AdminInvoicesComponent implements OnInit {

  public invoices: Invoice[];
  public invoicesFiltered: Invoice[];
  public filterValue = '';

  constructor(private cd: ChangeDetectorRef, private databaseService: DatabaseService) {
  }

  ngOnInit() {
      this.databaseService.getAllDocuments(DocumentType.INVOICE).then(
        (invoices: Invoice[]) => {
          this.invoices = invoices;
          this.invoicesFiltered = invoices;
          this.cd.detectChanges();
        }
      );
  }

  onSearch() {
    this.invoicesFiltered = _.filter(this.invoices, (invoice: Invoice) => {
      return invoice.title.toLowerCase().includes(this.filterValue.toLowerCase());
    });
    this.cd.detectChanges();
  }

}
