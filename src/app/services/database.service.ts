import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Invoice } from '../models/invoice';
import { User } from '../models/user';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private alertService: AlertService) {
  }

  getCurrentUser(): Promise<User> {
    const userId = firebase.auth().currentUser.uid;
    return firebase.database()
      .ref('/users/' + userId)
      .once('value')
      .then(user => new User(user.val()));
  }

  createOrUpdateUser(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.database()
        .ref('users/' + user.id).set({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        homePhone: user.homePhone,
        mobilePhone: user.mobilePhone,
        city: user.city,
        zipcode: user.zipcode,
        address: user.address
      })
      .then(
        res => {
          this.alertService.success('Vos informations personnelles ont bien été modifiées');
          resolve(res)
        },
        error => {
          this.alertService.error('Impossible de créer votre compte, veuillez réessayer plus tard');
        }
      );
    });
  }

  getUserInvoices(userId: string): Promise<Invoice[]> {
    const invoices: Invoice[] = [];

    return firebase.database()
      .ref('/invoices/' + userId)
      .once('value')
      .then(res => {
        res.forEach(invoice => {
          invoices.push(new Invoice(invoice.val()))
        });
        return invoices;
      }, error => {
        this.alertService.error('Impossible de récupérer les factures');
        return invoices;
      });
  }
}
