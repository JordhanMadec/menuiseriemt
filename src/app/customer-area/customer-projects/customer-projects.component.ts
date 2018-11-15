import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { Project } from '../../models/project';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-customer-projects',
  templateUrl: './customer-projects.component.html',
  styleUrls: ['./customer-projects.component.scss']
})
export class CustomerProjectsComponent implements OnInit, OnDestroy {
  public user: User;
  private userSubscription: Subscription;

  public projects: Project[];

  constructor(private cd: ChangeDetectorRef, private authService: AuthService, private databaseService: DatabaseService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user: User) => {
        this.user = user;
        this.cd.detectChanges();

        if (!user) {
          return;
        }

        this.databaseService.getUserProjects(this.user.id).then(
          (projects: Project[]) => {
            this.projects = projects;
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
