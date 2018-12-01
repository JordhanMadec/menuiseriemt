import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

export const passwordMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if  (!password) {
    return null;
  }

  if (password.value === confirmPassword.value) {
    return null;
  }

  return {mismatch: true};
};

export class PasswordValidator {
  private readonly _passwordValidator: FormGroup;

  constructor(fb: FormBuilder) {
    this._passwordValidator = fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      confirmPassword: ['', Validators.required]
    }, {validator: passwordMatcher});
  }

  get passwordValidator(): FormGroup {
    return this._passwordValidator;
  }
}
