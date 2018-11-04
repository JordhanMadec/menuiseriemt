import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private loginFailed = false;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'mail': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
      ])
    });
  }

  onSubmit() {
    this.loginFailed = true;
  }

}
