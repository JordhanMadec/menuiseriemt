import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private alertService: AlertService) { }

  getInvoiceUrl(fileName: string): Promise<string> {
    const userId = firebase.auth().currentUser.uid;
    return firebase.storage().ref('invoices/' + userId + '/' + fileName)
      .getDownloadURL()
      .then(url => url);
  }
}
