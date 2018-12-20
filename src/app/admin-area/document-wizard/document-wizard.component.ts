import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { DocumentType } from '../../models/document';
import { Invoice } from '../../models/invoice';
import { Project } from '../../models/project';
import { Quote } from '../../models/quote';
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';
import { DatabaseService } from '../../services/database.service';
import { DocumentValidator } from '../../validators/document-validator';

@Component({
  selector: 'app-document-wizard',
  templateUrl: './document-wizard.component.html',
  styleUrls: ['./document-wizard.component.scss']
})
export class DocumentWizardComponent implements OnInit, OnDestroy {

  public customerId: string;
  public documentId: string;

  private formChangesSubscription: Subscription;

  public isInvoice = false;

  public documentForm: FormGroup;
  public document: Invoice | Quote;
  public title = '';
  public subtitle = '';
  public loading = true;
  public asChanged = false;
  public updateLoading = false;

  modalRef: BsModalRef;

  customers = [];
  projects = [];
  documentTypes = [];

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private adminService: AdminService,
              private fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private location: Location) {
    this.documentForm = new DocumentValidator(this.fb).documentValidator;
  }

  ngOnInit() {
    this.loading = true;

    if (this.router.url.match('facture')) {
      this.isInvoice = true;
    }

    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.documentId = this.isInvoice ? this.route.snapshot.paramMap.get('invoiceId') : this.route.snapshot.paramMap.get('quoteId');

    this.buildDocumentTypesList();
    this.buildCustomersList();
    this.buildProjectsList();

    if (this.customerId && this.documentId) {
      if (this.isInvoice) {
        this.title = 'Modifier la facture';

        this.databaseService.getUserInvoice(this.customerId, this.documentId).then((invoice: Invoice) => {
          this.document = invoice;
          this.initForm();
        });
      } else {
        this.title = 'Modifier le devis';

        this.databaseService.getUserQuote(this.customerId, this.documentId).then((quote: Quote) => {
          this.document = quote;
          this.initForm();
        });
      }
    } else {
      this.title = this.isInvoice ? 'Nouvelle facture' : 'Nouveau devis';

      if (this.isInvoice) {
        this.documentForm.get('type').setValue(DocumentType.INVOICE)
      } else {
        this.documentForm.get('type').setValue(DocumentType.QUOTE)
      }

      this.formChangesSubscription = this.documentForm.valueChanges.subscribe(res => {
        this.asChanged = this.document && !this.document.equals(this.getDocumentFromForm());
        this.buildProjectsList();
        this.cd.detectChanges();
      });

      this.loading = false;
      this.cd.detectChanges();
    }
  }

  private initForm() {
    this.documentForm = new DocumentValidator(this.fb, this.document).documentValidator;

    this.formChangesSubscription = this.documentForm.valueChanges.subscribe(res => {
      this.asChanged = this.document && !this.document.equals(this.getDocumentFromForm());
      this.buildProjectsList();
      this.cd.detectChanges();
    });

    this.loading = false;
    this.cd.detectChanges();
  }

  private buildDocumentTypesList() {
    this.documentTypes = [
      {value: DocumentType.QUOTE, label: 'Devis'},
      {value: DocumentType.INVOICE, label: 'Facture'}
    ];
    this.cd.detectChanges();
  }

  private buildCustomersList() {
    this.customers = [];
    this.adminService.getAllUsers().then((users: User[]) => {
      users.forEach((user: User) => {
        this.customers = [...this.customers, {
          userId: user.id,
          userName: user.firstName + ' ' + user.lastName
        }];
      });
      this.cd.detectChanges();
    })
  }

  private buildProjectsList() {
    let ownerId = this.customerId;

    if (this.document && this.document.ownerId !== this.documentForm.get('ownerId').value) {
      ownerId = this.documentForm.get('ownerId').value;
    } else {
      ownerId = this.customerId || this.getDocumentFromForm().ownerId || null;
    }

    if (!ownerId || !ownerId.length) {
      this.projects = [];
      this.cd.detectChanges();
      return;
    }

    this.databaseService.getUserProjects(ownerId).then((projects: Project[]) => {
      this.projects = new Array();
      projects.forEach((project: Project) => {
        this.projects = [...this.projects, {
          projectId: project.id,
          projectTitle: project.title
        }];
      });
      this.cd.detectChanges();
    })
  }

  private getDocumentFromForm(): any {
    const document = {
      id: this.documentId ? this.documentId : null,
      title: this.documentForm.get('title').value.toString().trim(),
      ownerId: this.documentForm.get('ownerId').value,
      projectId: this.documentForm.get('projectId').value,
      done: this.documentForm.get('done').value,
      fileName: this.documentForm.get('fileName').value.toString().trim(),
      type: this.documentForm.get('type').value,
    }
    return document;
  }

  onChangeCustomer() {
    this.documentForm.get('projectId').setValue(null);
    this.buildProjectsList();
  }

  onSubmit() {
    if (this.document && (!this.asChanged || !this.documentForm.valid)) {
      return;
    }

    if (!this.documentForm.valid) {
      return;
    }

    this.updateLoading = true;

    if (this.documentId) {
      this.adminService.updateDocument(this.getDocumentFromForm()).then(
        res => {
          this.updateLoading = false;
          this.location.back();
        },
        error => {
          this.updateLoading = false;
        }
      );
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onDelete() {
    if (!this.document || !this.customerId) {
      this.modalRef.hide();
      return;
    }

    /*this.adminService.deleteProject(this.customerId, this.projectId).then(() => {
      this.modalRef.hide();
      this.ngZone.run(() => this.router.navigate(['/espace-admin/chantiers'], {skipLocationChange: true}));
    })*/
  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

}
