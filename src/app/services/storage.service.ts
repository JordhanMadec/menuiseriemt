import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private alertService: AlertService) { }

  getInvoiceUrl(userId: string, fileName: string): Promise<string> {
    return firebase.storage().ref('invoices/' + userId + '/' + fileName)
      .getDownloadURL()
      .then(url => url,
        error => this.alertService.error('Impossible de récupérer le document'));
  }

  getQuoteUrl(userId: string, fileName: string): Promise<string> {
    return firebase.storage().ref('quotes/' + userId + '/' + fileName)
      .getDownloadURL()
      .then(url => url,
        error => this.alertService.error('Impossible de récupérer le document'));
  }
}
