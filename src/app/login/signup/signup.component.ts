import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const phonePattern = '^[0-9]{10}$';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contact: this.fb.group({
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
      })
    });
  }

  ngOnInit() {
  }

  onSubmit() {
  }

}
