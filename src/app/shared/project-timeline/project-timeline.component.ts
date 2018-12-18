import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Project, ProjectStatus } from '../../models/project';
import { Utils } from '../utils';

@Component({
  selector: 'app-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss']
})
export class ProjectTimelineComponent implements OnInit, OnChanges {

  @Input() project: Project;

  public step = 0;
  public status = '';

  constructor() { }

  ngOnInit() {
    this.fetchStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchStatus();
  }

  private fetchStatus() {
    if (!this.project) {
      return;
    }

    this.status = Utils.getProjectStatus(this.project.status) || '';

    switch (this.project.status) {
      case ProjectStatus.NOT_STARTED:
        this.step = 0;
        break;
      case ProjectStatus.ORDERED:
        this.step = 1;
        break;
      case ProjectStatus.ONGOING:
        this.step = 2;
        break;
      case ProjectStatus.PENDING:
        this.step = 2;
        break;
      case ProjectStatus.WAITING_PAYMENT:
        this.step = 3;
        break;
      case ProjectStatus.COMPLETED:
        this.step = 4;
        break;
      default:
        this.step = 0;
    }
  }

}
