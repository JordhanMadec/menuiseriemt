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
      .then(url => url)
      .catch(error => {
        this.alertService.error('Impossible de récupérer le document');
        return null;
      });
  }

  getQuoteUrl(userId: string, fileName: string): Promise<string> {
    return firebase.storage().ref('quotes/' + userId + '/' + fileName)
      .getDownloadURL()
      .then(url => url)
      .catch(() => {
        this.alertService.error('Impossible de récupérer le document')
        return null;
      });
  }

  deleteDocument(userId: string, fileName: string, type: DocumentType): Promise<boolean> {
    const documentType = type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return firebase.storage().ref( documentType + '/' + userId + '/' + fileName)
      .delete()
      .then(() => true)
      .catch((error) => {
        this.alertService.error('Impossible de supprimer le fichier');
        return false;
      });
  }

  uploadDocument(userId: string, type: DocumentType, fileName: string, file: File): Promise<boolean> {
    const documentType = type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return firebase.storage().ref(documentType + '/' + userId + '/' + fileName)
      .put(file)
      .then(() => true)
      .catch(() => {
        this.alertService.error('Impossible d\'enregistrer le fichier');
        return false;
      });
  }

}
