import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  public user: User;

  constructor(
    public router: Router,
    private adminService: AdminService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchCustomer();
  }

  private fetchCustomer() {
    const customerId = this.route.snapshot.paramMap.get('customerId');

    if (!customerId) {
      this.ngZone.run(() => this.router.navigate(['/espace-admin/clients']));
      return;
    }

    this.adminService.getUser(customerId).then(
      (user: User) => {
        this.user = user;
        console.log(user);
        this.cd.detectChanges();
      }
    )
  }
}
