import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { Project, ProjectStatus } from '../../../models/project';
import { User } from '../../../models/user';
import { AdminService } from '../../../services/admin.service';
import { DatabaseService } from '../../../services/database.service';
import { Utils } from '../../../shared/utils';
import { ProjectValidator } from '../../../validators/project-validator';

declare var $: any;

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.scss']
})
export class ProjectWizardComponent implements OnInit, OnDestroy {

  private customerId: string;
  private projectId: string;

  private formChangesSubscription: Subscription;

  public projectForm: FormGroup;
  public project: Project;
  public projectTimeline: Project;
  public subtitle = '';
  public loading = true;
  public asChanged = false;
  public updateLoading = false;

  modalRef: BsModalRef;

  statusList = [];
  customers = [];

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private adminService: AdminService,
              private fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: BsModalService) {
    this.projectForm = new ProjectValidator(this.fb).projectPattern;
  }

  ngOnInit() {
    this.loading = true;

    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    this.buildStatusList();
    this.buildCustomersList();

    if (this.customerId && this.projectId) {
      this.databaseService.getUserProject(this.customerId, this.projectId).then((project: Project) => {
        this.project = project;
        this.projectTimeline = project;
        this.subtitle = Utils.dateToString(project.startDate) + ' - ' + (project.endDate ? Utils.dateToString(project.endDate) : Utils.getProjectStatus(this.project.status));
        this.projectForm = new ProjectValidator(this.fb, this.project).projectPattern;

        this.formChangesSubscription = this.projectForm.valueChanges.subscribe(res => {
          this.asChanged = this.project && !this.project.equals(this.getProjectFromForm()) || true;
          this.projectTimeline = new Project(this.getProjectFromForm());
          this.cd.detectChanges();
        });

        this.loading = false;
        this.cd.detectChanges();
      });
    } else {
      this.projectTimeline = new Project(this.getProjectFromForm());

      this.formChangesSubscription = this.projectForm.valueChanges.subscribe(res => {
        this.asChanged = this.project && !this.project.equals(this.getProjectFromForm()) || true;
        this.projectTimeline = new Project(this.getProjectFromForm());
        this.cd.detectChanges();
      });

      this.loading = false;
      this.cd.detectChanges();
    }
  }

  private buildStatusList() {
    Object.keys(ProjectStatus).forEach((status) => {
      this.statusList.push({
        value: status,
        label: Utils.getProjectStatus(status)
      })
    });
    this.cd.detectChanges();
  }

  private buildCustomersList() {
    this.adminService.getAllUsers().then((users: User[]) => {
      users.forEach((user: User) => {
        this.customers.push({
          userId: user.id,
          userName: user.firstName + ' ' + user.lastName
        })
      });
      this.cd.detectChanges();
    })
  }

  private getProjectFromForm(): any {
    const endDate = this.projectForm.get('information').get('endDate').value;

    const project = {
      id: this.projectId ? this.projectId : null,
      title: this.projectForm.get('title').value,
      ownerId: this.projectForm.get('ownerId').value,
      startDate: Utils.getDateDDMMYYYY(this.projectForm.get('information').get('startDate').value).toString(),
      endDate: endDate && Utils.getDateDDMMYYYY(endDate).toString() || null,
      status: this.projectForm.get('information').get('status').value,
      notes: this.projectForm.get('information').get('notes').value,
      city: this.projectForm.get('addressFields').get('city').value,
      zipcode: this.projectForm.get('addressFields').get('zipcode').value,
      address: this.projectForm.get('addressFields').get('address').value,
    }
    return project;
  }

  openStatusSelect() {
    $('ng-panel .ng-input').click();
}

  onSubmit() {
    if (this.project && (!this.asChanged || !this.projectForm.valid)) {
      return;
    }

    if (!this.projectForm.valid) {
      return;
    }

    this.updateLoading = true;

    this.adminService.createOrUpdateProject(this.getProjectFromForm()).then(
      res => {
        this.updateLoading = false;

        if (!this.customerId) {
          this.ngZone.run(() => this.router.navigate(['/espace-admin/chantiers']));
          return;
        }

        this.ngZone.run(() => this.router.navigate(['/espace-admin/chantiers/' + this.customerId + '/' + this.projectId]));
      },
      error => {
        this.updateLoading = false;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onDelete() {
    if (!this.project || !this.customerId) {
      this.modalRef.hide();
      return;
    }

    this.adminService.deleteProject(this.customerId, this.projectId).then(() => {
      this.modalRef.hide();
      this.ngZone.run(() => this.router.navigate(['/espace-admin/chantiers']));
    })
  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
