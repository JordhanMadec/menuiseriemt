import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../models/project';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.scss']
})
export class ProjectWizardComponent implements OnInit {

  private customerId: string;
  private projectId: string;

  public project: Project;
  public user: User;
  public subtitle = '';
  public loading = true;

  constructor(private cd: ChangeDetectorRef,
              private databaseService: DatabaseService,
              private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;

    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    if (this.customerId && this.projectId) {
      this.databaseService.getUser(this.customerId).then((user: User) => {
        this.user = user;
        this.loading = false;
        this.cd.detectChanges();
      });

      this.databaseService.getUserProject(this.customerId, this.projectId).then((project: Project) => {
        this.project = project;
        this.subtitle = project.startDate + ' - ' + (project.endDate ? project.endDate : this.project.getStatus());
        this.loading = false;
        this.cd.detectChanges();
      });
    } else {
      this.loading = false;
      this.cd.detectChanges();
    }
  }

}
