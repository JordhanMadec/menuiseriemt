import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';
import { DatabaseService } from '../../services/database.service';
import { UserValidator } from '../../validators/user-validator';

@Component({
  selector: 'app-client-wizard',
  templateUrl: './user-wizard.component.html',
  styleUrls: ['./user-wizard.component.scss']
})
export class UserWizardComponent implements OnInit, OnDestroy {

  public user: User;
  public profileForm: FormGroup;

  private formChangesSubscription: Subscription;

  public asChanged = false;
  private updateLoading = false;
  loading = true;

  constructor(
    public router: Router,
    private databaseService: DatabaseService,
    private adminService: AdminService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private location: Location)
  {
    this.profileForm = new UserValidator(this.fb).userValidator;
  }

  ngOnInit() {
    this.fetchCustomer();
  }

  private fetchCustomer() {
    const customerId = this.route.snapshot.paramMap.get('customerId');

    if (!customerId) {
      this.loading = false;
      this.cd.detectChanges();
      return;
    }

    this.databaseService.getUser(customerId).then(
      (user: User) => {
        this.user = user;
        this.profileForm = new UserValidator(this.fb, user).userValidator;
        this.asChanged = false;
        this.updateLoading = false;

        this.formChangesSubscription = this.profileForm.valueChanges.subscribe(res => {
          this.asChanged = !this.getUserFromForm().equals(this.user);
          this.cd.detectChanges();
        });

        this.loading = false;

        this.cd.detectChanges();
      }
    )
  }

  private getUserFromForm(): User {
    const user = {
      id: this.user ? this.user.id : null,
      firstName: this.profileForm.get('contact').get('firstName').value.toString().trim(),
      lastName: this.profileForm.get('contact').get('lastName').value.toString().trim(),
      email: this.profileForm.get('contact').get('email').value.toString().trim(),
      homePhone: this.profileForm.get('contact').get('homePhone').value.toString().trim(),
      mobilePhone: this.profileForm.get('contact').get('mobilePhone').value.toString().trim(),
      city: this.profileForm.get('addressFields').get('city').value.toString().trim(),
      zipcode: this.profileForm.get('addressFields').get('zipcode').value,
      address: this.profileForm.get('addressFields').get('address').value.toString().trim(),
    }
    return new User(user);
  }

  onSubmit() {
    if (this.user && (!this.asChanged || !this.profileForm.valid)) {
      return;
    }

    if (!this.profileForm.valid) {
      return;
    }

    this.updateLoading = true;

    this.adminService.createOrUpdateUser(this.getUserFromForm()).then(
      res => {
        this.updateLoading = false;
        this.location.back();
      },
      error => {
        this.updateLoading = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
