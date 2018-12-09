import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { AdminService } from '../../../services/admin.service';
import { UserProfileValidator } from '../../../shared/user-profile-validator';

@Component({
  selector: 'app-client-wizard',
  templateUrl: './client-wizard.component.html',
  styleUrls: ['./client-wizard.component.scss']
})
export class ClientWizardComponent implements OnInit, OnDestroy {

  public user: User;
  public profileForm: FormGroup;

  private formChangesSubscription: Subscription;

  public asChanged = false;
  private updateLoading = false;
  private loading = true;

  constructor(
    public router: Router,
    private adminService: AdminService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute)
  {
    this.profileForm = new UserProfileValidator(this.fb).userProfileValidator;
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

    this.adminService.getUser(customerId).then(
      (user: User) => {
        this.user = user;
        this.profileForm = new UserProfileValidator(this.fb, user).userProfileValidator;
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

        if (!this.user) {
          this.ngZone.run(() => this.router.navigate(['/espace-admin/clients']));
        }

        this.ngZone.run(() => this.router.navigate(['/espace-admin/clients/' + this.user.id]));
      },
      error => {
        this.updateLoading = false;
      }
    );
  }

  deleteUser() {
    if (!this.user) {
      return;
    }

    this.updateLoading = true;

    this.adminService.deleteUser(this.user.id).then(res => {
      this.updateLoading = false;
      this.ngZone.run(() => this.router.navigate(['/espace-admin/clients']));
    }, error => {
      this.updateLoading = false;
    })
  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
