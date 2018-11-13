import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertService, StatusEnum } from '../services/alert.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit, OnDestroy {

  public alerts: Alert[] = [];
  public statusEnum = StatusEnum;

  private alertSubscription: Subscription;

  constructor(private alertService: AlertService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.alertSubscription = this.alertService.alertEmitter.subscribe(
      (alert: Alert) => {
        this.alerts.push(alert);
        this.cd.detectChanges();
        setTimeout(
          () => {
            this.alerts = this.alerts.filter(obj => obj !== alert);
            this.cd.detectChanges();
          },
          alert.duration
        );
      }
    )
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
