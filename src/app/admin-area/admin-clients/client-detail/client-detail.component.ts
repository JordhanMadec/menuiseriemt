import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentType } from '../../../models/document';
import { Invoice } from '../../../models/invoice';
import { Project } from '../../../models/project';
import { Quote } from '../../../models/quote';
import { User } from '../../../models/user';
import { DatabaseService } from '../../../services/database.service';
import { Utils } from '../../../shared/utils';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  public user: User;

  public projects: Project[];
  public invoices: Invoice[];
  public quotes: Quote[];

  constructor(
    public router: Router,
    private databaseService: DatabaseService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchCustomer();
  }

  private fetchCustomer() {
    const customerId = this.route.snapshot.paramMap.get('customerId');

    if (!customerId) {
      this.ngZone.run(() => this.router.navigate(['/espace-admin/clients']));
      return;
    }

    this.databaseService.getUser(customerId).then(
      (user: User) => {
        this.user = user;
        this.fetchProjects();
        this.fetchQuotes();
        this.fetchInvoices();
        this.cd.detectChanges();
      }
    )
  }

  private fetchProjects() {
    this.databaseService.getUserProjects(this.user.id).then((projects: Project[]) => {
      this.projects = projects;
      this.cd.detectChanges();
    })
  }

  private fetchQuotes() {
    this.databaseService.getUserDocuments(this.user.id, DocumentType.QUOTE).then((quotes: Quote[]) => {
      this.quotes = quotes;
      this.cd.detectChanges();
    })
  }

  private fetchInvoices() {
    this.databaseService.getUserDocuments(this.user.id, DocumentType.INVOICE).then((invoices: Invoice[]) => {
      this.invoices = invoices;
      this.cd.detectChanges();
    })
  }

  getProjectStatus(project: Project) {
    return Utils.getProjectStatus(project.status);
  }
}
