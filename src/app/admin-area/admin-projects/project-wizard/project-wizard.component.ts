import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../../../models/project';
import { User } from '../../../models/user';
import { DatabaseService } from '../../../services/database.service';
import { ProjectValidator } from '../../../validators/project-validator';

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
  public user: User;
  public subtitle = '';
  public loading = true;
  public asChanged = false;
  private updateLoading = false;

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
    this.projectForm = new ProjectValidator(this.fb).projectPattern;
  }

  ngOnInit() {
    this.loading = true;

    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    if (this.customerId && this.projectId) {
      this.databaseService.getUserProject(this.customerId, this.projectId).then((project: Project) => {
        this.project = project;
        this.projectTimeline = project;
        this.subtitle = project.startDate + ' - ' + (project.endDate ? project.endDate : this.project.getStatus());
        this.projectForm = new ProjectValidator(this.fb , this.project).projectPattern;

        this.databaseService.getUser(this.customerId).then((user: User) => {
          this.user = user;
          this.loading = false;
          this.cd.detectChanges();
        });

        this.formChangesSubscription = this.projectForm.valueChanges.subscribe(res => {
          this.asChanged = !this.getProjectFromForm().equals(this.project);
          this.projectTimeline = this.getProjectFromForm();
          this.cd.detectChanges();
        });

        this.cd.detectChanges();
      });
    } else {
      this.loading = false;
      this.cd.detectChanges();
    }
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

  onSubmit() {

  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
