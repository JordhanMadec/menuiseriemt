import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-admin-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrls: ['./admin-invoices.component.scss']
})
export class AdminInvoicesComponent implements OnInit {

  public invoices: Invoice[];

  constructor(private cd: ChangeDetectorRef, private databaseService: DatabaseService) {
  }

  ngOnInit() {
      this.databaseService.getAllInvoices().then(
        (invoices: Invoice[]) => {
          this.invoices = invoices;
          this.cd.detectChanges();
        }
      );
  }
}
