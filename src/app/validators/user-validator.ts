import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';

export const phonePattern = '^[0-9]{10}$';

export class UserValidator {
  private readonly _userValidator: FormGroup;

  constructor(fb: FormBuilder, user: User = null) {
    this._userValidator = fb.group({
      contact: fb.group({
        firstName: [user && user.firstName || '', Validators.required],
        lastName: [user && user.lastName || '', Validators.required],
        email: [user && user.email || '', [
          Validators.required,
          Validators.email
        ]],

        homePhone: [user && user.homePhone || '', [
          Validators.pattern(phonePattern)
        ]],
        mobilePhone: [user && user.mobilePhone || '', [
          Validators.pattern(phonePattern)
        ]]
      }),
      addressFields: fb.group({
        city: [user && user.city || '', Validators.required],
        zipcode: [user && user.zipcode || '', [
          Validators.required,
          Validators.pattern('^[0-9]{5}$')
        ]],
        address: [user && user.address || '', Validators.required],
      }),
    });
  }

  get userValidator(): FormGroup {
    return this._userValidator;
  }
}
