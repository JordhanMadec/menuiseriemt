import { EventEmitter, Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Notif } from '../models/notif';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private _hasNotification: EventEmitter<Notif[]> = new EventEmitter<Notif[]>();

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private databaseService: DatabaseService) {

    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.fetchNotifications(user.uid);
        } else {
          this._hasNotification.emit([]);
        }
      }
    );
  }

  fetchNotifications(userId: string) {
    const notifs: Notif[] = [];

    this.databaseService.getUserInvoices(userId).then(invoices => {
      invoices.filter(invoice => !invoice.done).forEach(invoice => {
        notifs.push(new Notif({
          text: 'Facture à payer',
          date: 'Depuis le ' + invoice.lastUpdate,
          link: '/espace-client/factures/' + invoice.id,
          read: false,
        }));
      });

      this.databaseService.getUserQuotes(userId).then(quotes => {
        quotes.filter(quote => !quote.done).forEach(quote => {
          notifs.push(new Notif({
            text: 'Devis à valider',
            date: 'Depuis le ' + quote.lastUpdate,
            link: '/espace-client/devis/' + quote.id,
            read: false,
          }));
        });

        this._hasNotification.emit(notifs);

        if (notifs.length) {
          this.alertService.info('Vous aves des notifications en attente', 4000);
        }
      })
    });
  }

  get hasNotification(): EventEmitter<Notif[]> {
    return this._hasNotification;
  }
}
