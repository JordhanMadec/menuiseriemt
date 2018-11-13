import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserProfileValidator } from '../../shared/user-profile-validator';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public profileForm: FormGroup;
  public asChanged = false;

  private userSubscription: Subscription;
  private formChangesSubscription: Subscription;

  constructor(public router: Router, private authService: AuthService, private cd: ChangeDetectorRef, private fb: FormBuilder) {
    this.profileForm = new UserProfileValidator(this.fb).userProfileValidator;
  }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(
      user => {
        this.user = user;
        this.profileForm = new UserProfileValidator(this.fb, user).userProfileValidator;

        this.formChangesSubscription = this.profileForm.valueChanges.subscribe(res => {
          this.asChanged = !this.getUserFromForm().equals(this.user);
          this.cd.detectChanges();
        });

        this.cd.detectChanges();
      }
    );
  }

  private getUserFromForm(): User {
    const user = {
      firstName: this.profileForm.get('contact').get('firstName').value,
      lastName: this.profileForm.get('contact').get('lastName').value,
      email: this.profileForm.get('contact').get('email').value,
      homePhone: this.profileForm.get('contact').get('homePhone').value,
      mobilePhone: this.profileForm.get('contact').get('mobilePhone').value,
      city: this.profileForm.get('addressFields').get('city').value,
      zipcode: this.profileForm.get('addressFields').get('zipcode').value,
      address: this.profileForm.get('addressFields').get('address').value,
    }
    return new User(user);
  }

  onSubmit() {
    if (!this.asChanged || !this.profileForm.valid) {
      return
    }


  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
