import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PasswordValidator } from '../../shared/password-validator';

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
    this.resetPasswordForm = new PasswordValidator(this.fb).passwordValidator;
  }

  onSubmit() {
  }
}


