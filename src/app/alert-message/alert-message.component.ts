import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertService, StatusEnum } from '../services/alert.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit, OnDestroy {

  public alert: Alert;
  public statusEnum = StatusEnum;

  private alertSubscription: Subscription;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertSubscription = this.alertService.alertEmitter.subscribe(
      (alert: Alert) => {
        this.alert = alert;
        setTimeout(() => this.alert = null, alert.duration);
      }
    )
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
