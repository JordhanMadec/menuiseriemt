import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../models/invoice';
import { Quote } from '../models/quote';

export class DocumentValidator {
  private readonly _documentValidator: FormGroup;

  constructor(fb: FormBuilder, document: Invoice | Quote = null) {
    this._documentValidator = fb.group({
      title: [document && document.title || '', Validators.required],
      fileName: [document && document.fileName || '', Validators.required],
      ownerId: [document && document.ownerId || '', Validators.required],
      projectId: [document && document.projectId || '', Validators.required],
      done: [document && document.done || false, Validators.required],
    });
  }

  get documentValidator(): FormGroup {
    return this._documentValidator;
  }
}
