import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../login.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  private forgotPasswordForm: FormGroup;
  private mailFailed = false;

  constructor() { }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      'mail': new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }

  onSubmit() {
  }
}
