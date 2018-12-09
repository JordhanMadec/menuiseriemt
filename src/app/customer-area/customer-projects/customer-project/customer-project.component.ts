import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from '../../../models/invoice';
import { Project } from '../../../models/project';
import { Quote } from '../../../models/quote';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-customer-project',
  templateUrl: './customer-project.component.html',
  styleUrls: ['./customer-project.component.scss']
})
export class CustomerProjectComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;

  public user: User;
  public invoices: Invoice[];
  public quotes: Quote[];
  public project: Project;
  private projectId: string;
  public subtitle = '';

  constructor(private cd: ChangeDetectorRef,
              private authService: AuthService,
              private databaseService: DatabaseService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        this.cd.detectChanges();

        if (!user || !this.projectId ) {
          return;
        }

        this.databaseService.getUserProject(this.user.id, this.projectId).then(
          (project: Project) => {
            this.project = project;
            this.subtitle = project.startDate + ' - ' + (project.endDate ? project.endDate : this.project.getStatus());
            this.cd.detectChanges();
          }
        );

        this.databaseService.getProjectInvoices(this.user.id, this.projectId).then(
          (invoices: Invoice[]) => {
            this.invoices = invoices;
            this.cd.detectChanges();
          }
        );

        this.databaseService.getProjectQuotes(this.user.id, this.projectId).then(
          (quotes: Quote[]) => {
            this.quotes = quotes;
            this.cd.detectChanges();
          }
        );
      }
    );
  }



  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
