import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentType } from '../../models/document';
import { Project } from '../../models/project';
import { Quote } from '../../models/quote';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-customer-quote',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class QuoteViewerComponent implements OnInit, OnDestroy {

  public customerId: string;
  public documentId: string;

  private isAdminSubscription: Subscription;

  public project: Project;
  public user: User;
  public document: Quote;
  public documentUrl: string;
  public isAdmin = false;
  public root = '/devis';
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
    this.documentId = this.route.snapshot.paramMap.get('quoteId');

    this.databaseService.getUserDocument(this.customerId, this.documentId, DocumentType.QUOTE).then(
      (quote: Quote) => {
        this.document = quote;
        this.tag = quote.getStatus();
        this.cd.detectChanges();

        this.storageService.getDocumentUrl(quote).then(url => {
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
