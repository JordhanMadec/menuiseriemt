import { EventEmitter, Injectable } from '@angular/core';

const defaultDuration = 3000;

@Injectable()
export class AlertService {
  private _alertEmitter: EventEmitter<Alert> = new EventEmitter<Alert>();

  constructor() {
  }

  success(message: string, duration = defaultDuration) {
    this._alertEmitter.emit(new Alert(message, duration, StatusEnum.SUCCESS));
  }

  error(message: string, duration = defaultDuration) {
    this._alertEmitter.emit(new Alert(message, duration, StatusEnum.ERROR));
  }

  info(message: string, duration = defaultDuration) {
    this._alertEmitter.emit(new Alert(message, duration, StatusEnum.INFO));
  }

  get alertEmitter(): EventEmitter<Alert> {
    return this._alertEmitter;
  }
}

export class Alert {
  message: String;
  duration: number;
  status: StatusEnum;

  constructor(message: String, duration: number, status: StatusEnum) {
    this.message = message;
    this.status = status;
    this.duration = duration;
  }
}

export enum StatusEnum { SUCCESS, ERROR, INFO }
