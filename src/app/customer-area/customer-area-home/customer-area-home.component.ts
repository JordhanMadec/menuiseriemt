import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-area-home',
  templateUrl: './customer-area-home.component.html',
  styleUrls: ['./customer-area-home.component.scss']
})
export class CustomerAreaHomeComponent implements OnInit, OnDestroy {

  public user: User;
  private userSubscription: Subscription;

  constructor(private authService: AuthService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(
      user => {
        this.user = user;
        this.cd.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
