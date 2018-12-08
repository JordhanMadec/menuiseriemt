import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent implements OnInit {

  public projects: Project[];

  constructor(private cd: ChangeDetectorRef, private authService: AuthService, private adminService: AdminService) {
  }

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.adminService.getAllProjects().then(
      (projects: Project[]) => {
        this.projects = projects;
        this.cd.detectChanges();
      }
    );
  }
}
