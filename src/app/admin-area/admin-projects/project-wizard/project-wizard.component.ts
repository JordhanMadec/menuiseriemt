import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project, ProjectStatus } from '../../../models/project';
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

  statusList = [];

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private adminService: AdminService,
              private fb: FormBuilder,
              private ngZone: NgZone,
              private router: Router,
              private route: ActivatedRoute) {
    this.projectForm = new ProjectValidator(this.fb).projectPattern;
  }

  ngOnInit() {
    this.loading = true;

    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    this.buildStatusList();

    if (this.customerId && this.projectId) {
      this.databaseService.getUserProject(this.customerId, this.projectId).then((project: Project) => {
        this.project = project;
        this.projectTimeline = project;
        this.subtitle = project.startDate + ' - ' + (project.endDate ? project.endDate : this.project.getStatus());
        this.projectForm = new ProjectValidator(this.fb, this.project).projectPattern;

        this.formChangesSubscription = this.projectForm.valueChanges.subscribe(res => {
          this.asChanged = this.project && !this.getProjectFromForm().equals(this.project) || true;
          this.projectTimeline = this.getProjectFromForm();
          this.cd.detectChanges();
        });

        this.loading = false;
        this.cd.detectChanges();
      });
    } else {
      this.projectTimeline = this.getProjectFromForm();

      this.formChangesSubscription = this.projectForm.valueChanges.subscribe(res => {
        this.asChanged = this.project && !this.getProjectFromForm().equals(this.project) || true;
        this.projectTimeline = this.getProjectFromForm();
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

  private getProjectFromForm(): Project {
    const project = {
      id: this.projectId ? this.projectId : null,
      title: this.projectForm.get('title').value,
      ownerId: this.projectForm.get('ownerId').value,
      startDate: this.projectForm.get('information').get('startDate').value,
      endDate: this.projectForm.get('information').get('endDate').value,
      status: this.projectForm.get('information').get('status').value,
      notes: this.projectForm.get('information').get('notes').value,
      city: this.projectForm.get('addressFields').get('city').value,
      zipcode: this.projectForm.get('addressFields').get('zipcode').value,
      address: this.projectForm.get('addressFields').get('address').value,
    }
    return new Project(project);
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
        }

        this.ngZone.run(() => this.router.navigate(['/espace-admin/chantiers/' + this.customerId + '/' + this.projectId]));
      },
      error => {
        this.updateLoading = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
