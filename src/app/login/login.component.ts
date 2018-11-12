import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginFailed = false;

  constructor(private authService: AuthService, private router: Router) { }

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

    // Reset login status
    this.authService.logout()
  }

  private login(username: string, password: string) {
    this.authService.login(username, password).then(
      res => {
        this.loginFailed = false;
        this.router.navigate(['espace-client'])
      },
      error => {
        console.log('Login error', error);
        this.loginFailed = true;
        return null
      }
    );
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.controls.mail.value.toString();
    const password = this.loginForm.controls.password.value.toString();
    this.login(username, password);
  }
}
