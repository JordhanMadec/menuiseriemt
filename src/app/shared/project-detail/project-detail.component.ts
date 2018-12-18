import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { Project } from '../../models/project';
import { Quote } from '../../models/quote';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  private customerId: string;
  private projectId: string;

  private isAdminSubscription: Subscription;

  public isAdmin = false;

  public invoices: Invoice[];
  public quotes: Quote[];
  public project: Project;
  public user: User;
  public subtitle = '';
  public status = '';

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    this.isAdminSubscription = this.authService.isAdmin().subscribe(res => {
      this.isAdmin = res;
      this.cd.detectChanges();
    })

    this.databaseService.getUser(this.customerId).then((user: User) => {
      this.user = user;
      this.cd.detectChanges();
    });

    this.databaseService.getUserProject(this.customerId, this.projectId).then((project: Project) => {
      this.project = project;
      this.status = project && Utils.getProjectStatus(project.status) || '';
      this.subtitle = Utils.dateToString(project.startDate) + ' - ' + (project.endDate ? Utils.dateToString(project.endDate) : Utils.getProjectStatus(this.project.status));
      this.cd.detectChanges();
    });

    this.databaseService.getProjectInvoices(this.customerId, this.projectId).then((invoices: Invoice[]) => {
      this.invoices = invoices;
      this.cd.detectChanges();
    });

    this.databaseService.getProjectQuotes(this.customerId, this.projectId).then((quotes: Quote[]) => {
      this.quotes = quotes;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    }
  }
}
