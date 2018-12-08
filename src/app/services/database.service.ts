import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import { Invoice } from '../models/invoice';
import { Project } from '../models/project';
import { Quote } from '../models/quote';
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
        address: user.address,
        isAdmin: false,
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







  // INVOICES & QUOTES

  getUserInvoices(userId: string): Promise<Invoice[]> {
    const invoices: Invoice[] = [];

    return firebase.database()
      .ref('/invoices/' + userId)
      .once('value')
      .then(res => {
        res.forEach(_invoice => {
          const invoice: Invoice = new Invoice(_invoice.val());
          invoice.id = _invoice.key;
          invoices.push(invoice);
        });
        return invoices;
      }, error => {
        this.alertService.error('Impossible de récupérer les factures');
        return invoices;
      });
  }

  getUserInvoice(userId: string, invoiceId: string): Promise<Invoice> {
    return firebase.database()
      .ref('/invoices/' + userId + '/' + invoiceId)
      .once('value')
      .then(invoice => {
        return new Invoice(invoice.val());
      }, error => {
        this.alertService.error('Impossible de récupérer la facture');
        return null;
      });
  }

  getUserQuotes(userId: string): Promise<Quote[]> {
    const quotes: Quote[] = [];

    return firebase.database()
      .ref('/quotes/' + userId)
      .once('value')
      .then(res => {
        res.forEach(_quote => {
          const quote: Quote = new Quote(_quote.val());
          quote.id = _quote.key;
          quotes.push(quote);
        });
        return quotes;
      }, error => {
        this.alertService.error('Impossible de récupérer les devis');
        return quotes;
      });
  }

  getUserQuote(userId: string, quoteId: string): Promise<Quote> {
    return firebase.database()
      .ref('/quotes/' + userId + '/' + quoteId)
      .once('value')
      .then(quote => {
        return new Quote(quote.val());
      }, error => {
        this.alertService.error('Impossible de récupérer le devis');
        return null;
      });
  }

  getProjectInvoices(userId: string, projectId: string): Promise<Invoice[]> {
    return this.getUserInvoices(userId).then(
      (_invoices: Invoice[]) => _invoices.filter(invoice => invoice.projectId + '' === projectId)
    )
  }

  getProjectQuotes(userId: string, projectId: string): Promise<Quote[]> {
    return this.getUserQuotes(userId).then(
      (_quotes: Quote[]) => _quotes.filter(quote => quote.projectId + '' === projectId)
    )
  }













  // PROJECTS

  getUserProjects(userId: string): Promise<Project[]> {
    const projects: Project[] = [];

    return firebase.database()
      .ref('/projects/' + userId)
      .once('value')
      .then(res => {
        res.forEach(_project => {
          const project: Project = new Project(_project.val());
          project.id = _project.key;
          projects.push(project);
        });
        return projects;
      }, error => {
        this.alertService.error('Impossible de récupérer les chantiers');
        return projects;
      });
  }

  getUserProject(userId: string, projectId: string): Promise<Project> {
    return firebase.database()
      .ref('/projects/' + userId + '/' + projectId)
      .once('value')
      .then(project => {
        return new Project(project.val());
      }, error => {
        this.alertService.error('Impossible de récupérer le chantier');
        return null;
      });
  }
}
