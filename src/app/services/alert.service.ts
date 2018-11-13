import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AlertService {
  private _alertEmitter: EventEmitter<Alert> = new EventEmitter<Alert>();
  private currentAlert: Alert;

  constructor() {
    this.currentAlert = new Alert();
  }

  success(message: string, duration = 4000) {
    this.currentAlert.message = message;
    this.currentAlert.status = StatusEnum.SUCCESS;
    this.currentAlert.duration = duration;
    this._alertEmitter.emit(this.currentAlert);
  }

  error(message: string, duration = 4000) {
    this.currentAlert.message = message;
    this.currentAlert.status = StatusEnum.ERROR;
    this.currentAlert.duration = duration;
    this._alertEmitter.emit(this.currentAlert);
  }

  info(message: string, duration = 4000) {
    this.currentAlert.message = message;
    this.currentAlert.status = StatusEnum.INFO;
    this.currentAlert.duration = duration;
    this._alertEmitter.emit(this.currentAlert);
  }

  get alertEmitter(): EventEmitter<Alert> {
    return this._alertEmitter;
  }
}

export class Alert {
  message: String;
  duration: number;
  status: StatusEnum;
}

export enum StatusEnum { SUCCESS, ERROR, INFO }
