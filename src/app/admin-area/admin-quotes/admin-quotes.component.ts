import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DocumentType } from '../../models/document';
import { Quote } from '../../models/quote';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-admin-quotes',
  templateUrl: './admin-quotes.component.html',
  styleUrls: ['./admin-quotes.component.scss']
})
export class AdminQuotesComponent implements OnInit {

  public quotes: Quote[];
  public quotesFiltered: Quote[];
  public filterValue = '';

  constructor(private cd: ChangeDetectorRef, private databaseService: DatabaseService) {
  }

  ngOnInit() {
    this.databaseService.getAllDocuments(DocumentType.QUOTE).then(
      (quotes: Quote[]) => {
        this.quotes = quotes;
        this.quotesFiltered = quotes;
        this.cd.detectChanges();
      }
    );
  }

  onSearch() {
    this.quotesFiltered = _.filter(this.quotes, (quote: Quote) => {
      return quote.title.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      quote.getStatus().toLowerCase().includes(this.filterValue.toLowerCase());
    });
    this.cd.detectChanges();
  }

}
