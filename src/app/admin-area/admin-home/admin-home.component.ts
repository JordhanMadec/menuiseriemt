import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss', '../../customer-area/customer-home/customer-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnDestroy {

  public user: User;
  private userSubscription: Subscription;

  constructor(private cd: ChangeDetectorRef, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(
      user => {
        this.user = user;

        this.cd.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
