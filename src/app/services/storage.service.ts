import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import { DocumentType } from '../models/document';
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

  deleteDocument(userId: string, fileName: string, type: DocumentType): Promise<boolean> {
    const documentType = type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return firebase.storage().ref( documentType + '/' + userId + '/' + fileName)
      .delete()
      .then(() => true)
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

}
