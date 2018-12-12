import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Project, ProjectStatus } from '../models/project';

export class ProjectValidator {
  private readonly _projectValidator: FormGroup;

  constructor(fb: FormBuilder, project: Project = null) {
    this._projectValidator = fb.group({
      title: [project && project.title || '', Validators.required],
      ownerId: [project && project.ownerId || '', Validators.required],
      information: fb.group({
        startDate: [project && moment(project.startDate).format('DD/MM/YYYY') || new Date(), [
          Validators.required,
          Validators.pattern('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$')
        ]],
        endDate: [project && project.endDate && moment(project.endDate).format('DD/MM/YYYY') || '', [
          Validators.pattern('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$')
        ]],
        status: [project && project.status || ProjectStatus.NOT_STARTED, Validators.required],
        notes: [project && project.notes || '', Validators.required],
      }),
      addressFields: fb.group({
        city: [project && project.city || '', Validators.required],
        zipcode: [project && project.zipcode || '', [
          Validators.required,
          Validators.pattern('^[0-9]{5}$')
        ]],
        address: [project && project.address || '', Validators.required],
      }),
    });
  }

  get projectPattern(): FormGroup {
    return this._projectValidator;
  }
}
