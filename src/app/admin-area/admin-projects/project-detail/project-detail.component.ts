import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../../models/invoice';
import { Project } from '../../../models/project';
import { Quote } from '../../../models/quote';
import { User } from '../../../models/user';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  private customerId: string;
  private projectId: string;

  public invoices: Invoice[];
  public quotes: Quote[];
  public project: Project;
  public user: User;
  public subtitle = '';

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    this.databaseService.getUser(this.customerId).then((user: User) => {
      this.user = user;
      this.cd.detectChanges();
    });

    this.databaseService.getUserProject(this.customerId, this.projectId).then((project: Project) => {
      this.project = project;
      this.subtitle = project.startDate + ' - ' + (project.endDate ? project.endDate : this.project.getStatus());
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
}
