import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { Project } from '../../models/project';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class InvoiceViewerComponent implements OnInit, OnDestroy {

  public documentId: string;
  public customerId: string;

  private isAdminSubscription: Subscription;

  public project: Project;
  public user: User;
  public document: Invoice;
  public documentUrl: string;
  public isAdmin = false;
  public root = '/facture';
  public tag: string;
  public projectStatus = '';

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private storageService: StorageService,
              private authService: AuthService,
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

        this.databaseService.getUser(this.customerId).then((user: User) => {
          this.user = user;
          this.cd.detectChanges();
        });

        this.databaseService.getUserProject(this.customerId, this.document.projectId).then((project: Project) => {
          this.project = project;
          this.projectStatus = Utils.getProjectStatus(project.status) || '';
          this.cd.detectChanges();
        })
      }
    );

    this.isAdminSubscription = this.authService.isAdmin().subscribe(res => {
      this.isAdmin = res;
      this.cd.detectChanges();
    })
  }

  ngOnDestroy(): void {
    if (this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    }
  }
}
