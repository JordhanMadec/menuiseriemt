import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project, ProjectStatus } from '../models/project';

export class ProjectValidator {
  private readonly _projectValidator: FormGroup;

  constructor(fb: FormBuilder, project: Project = null) {
    this._projectValidator = fb.group({
      title: [project && project.title || '', Validators.required],
      ownerId: [project && project.ownerId || '', Validators.required],
      information: fb.group({
        startDate: [project && project.startDate || new Date(), Validators.required],
        endDate: [project && project.endDate || ''],
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
