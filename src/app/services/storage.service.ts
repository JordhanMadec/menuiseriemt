import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import { DocumentType } from '../models/document';
import { Invoice } from '../models/invoice';
import { Quote } from '../models/quote';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private alertService: AlertService) { }

  getDocumentUrl(document: Invoice | Quote): Promise<string> {
    const documentType = document.type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return firebase.storage().ref(document.ownerId + '/' + documentType + '/' + document.id)
      .getDownloadURL()
      .then(url => url)
      .catch(() => {
        this.alertService.error('Impossible de récupérer le document');
        return null;
      });
  }

  deleteDocument(document: Invoice | Quote): Promise<boolean> {
    const documentType = document.type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return firebase.storage().ref( document.ownerId + '/' + documentType + '/' + document.id)
      .delete()
      .then(() => true)
      .catch((error) => {
        this.alertService.error('Impossible de supprimer le fichier');
        return false;
      });
  }

  uploadDocument(document: Invoice | Quote, file: File): Promise<boolean> {
    const documentType = document.type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return firebase.storage().ref(document.ownerId + '/' + documentType + '/' + document.id)
      .put(file)
      .then(() => true)
      .catch(() => {
        this.alertService.error('Impossible d\'enregistrer le fichier');
        return false;
      });
  }

}
