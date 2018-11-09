import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../login.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      confirmPassword: ['', Validators.required]
    }, {validator: passwordMatcher});
  }

  onSubmit() {
  }
}


