import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent implements OnInit {

  public projects: Project[];

  constructor(private cd: ChangeDetectorRef, private databaseService: DatabaseService) {
  }

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.databaseService.getAllProjects().then(
      (projects: Project[]) => {
        this.projects = projects;
        this.cd.detectChanges();
      }
    );
  }
}
