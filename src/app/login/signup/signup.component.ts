import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordValidator } from '../../shared/password-validator';

export const phonePattern = '^[0-9]{10}$';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login.component.scss']
})
export class SignupComponent {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      contact: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [
          Validators.required,
          Validators.email
        ]],

        homePhone: ['', [
          Validators.pattern(phonePattern)
        ]],
        mobilePhone: ['', [
          Validators.pattern(phonePattern)
        ]]
      }),
      addressFields: this.fb.group({
        city: ['', Validators.required],
        zipcode: ['', [
          Validators.required,
          Validators.pattern('^[0-9]{5}$')
        ]],
        address: ['', Validators.required],
      }),
      password: new PasswordValidator(this.fb).passwordValidator,
      acceptConditions: ['', Validators.requiredTrue]
    });
  }

  private signup(username: string, password: string) {
    this.authService.signup(username, password).then(
      res => {
        console.log('Signup successful', res);
        this.router.navigate(['login'])
      },
      error => {
        console.log('Signup error', error);
        return null
      }
    );
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const username = this.signupForm.get('contact').get('email').value.toString();
    const password = this.signupForm.get('password').get('password').value.toString();
    this.signup(username, password);
  }

}
