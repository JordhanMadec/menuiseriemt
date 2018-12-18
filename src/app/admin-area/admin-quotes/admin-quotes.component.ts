import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Quote } from '../../models/quote';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-admin-quotes',
  templateUrl: './admin-quotes.component.html',
  styleUrls: ['./admin-quotes.component.scss']
})
export class AdminQuotesComponent implements OnInit {

  public quotes: Quote[];

  constructor(private cd: ChangeDetectorRef, private databaseService: DatabaseService) {
  }

  ngOnInit() {
    this.databaseService.getAllQuotes().then(
      (quotes: Quote[]) => {
        this.quotes = quotes;
        this.cd.detectChanges();
      }
    );
  }

}
