import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { PasswordValidator } from '../../shared/password-validator';
import { UserProfileValidator } from '../../shared/user-profile-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login.component.scss']
})
export class SignupComponent {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = new UserProfileValidator(fb).userProfileValidator;
    this.signupForm.addControl('password', new PasswordValidator(fb).passwordValidator);
    this.signupForm.addControl('acceptConditions', new FormControl( '', Validators.requiredTrue));
  }

  private signup(username: string, password: string) {
    const user = this.getUserFromForm();
    this.authService.signup(user, password).then(
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

  private getUserFromForm(): User {
    const user = {
      firstName: this.signupForm.get('contact').get('firstName').value,
      lastName: this.signupForm.get('contact').get('lastName').value,
      email: this.signupForm.get('contact').get('email').value,
      homePhone: this.signupForm.get('contact').get('homePhone').value,
      mobilePhone: this.signupForm.get('contact').get('mobilePhone').value,
      city: this.signupForm.get('addressFields').get('city').value,
      zipcode: this.signupForm.get('addressFields').get('zipcode').value,
      address: this.signupForm.get('addressFields').get('address').value,
    }
    return new User(user);
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
