import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Project } from '../../models/project';
import { DatabaseService } from '../../services/database.service';
import { Utils } from '../../shared/utils';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent implements OnInit {

  public projects: Project[];
  public projectsFiltered: Project[];
  public filterValue = '';

  constructor(private cd: ChangeDetectorRef, private databaseService: DatabaseService) {
  }

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.databaseService.getAllProjects().then(
      (projects: Project[]) => {
        this.projects = projects;
        this.projectsFiltered = projects;
        this.cd.detectChanges();
      }
    );
  }

  getProjectStatus(project: Project) {
    return Utils.getProjectStatus(project.status);
  }

  onSearch() {
    this.projectsFiltered = _.filter(this.projects, (project: Project) => {
      return project.title.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        Utils.getProjectStatus(project.status).toLowerCase().includes(this.filterValue.toLowerCase());
    });
    this.cd.detectChanges();
  }
}
