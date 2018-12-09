import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import { environment } from '../../environments/environment';
import { Invoice } from '../models/invoice';
import { Project } from '../models/project';
import { Quote } from '../models/quote';
import { User } from '../models/user';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private alertService: AlertService) {
  }



  // USERS

  getAllUsers(): Promise<User[]> {
    return firebase.database()
        .ref('/users')
        .once('value')
        .then(_users => {
          const users = [];

          _users.forEach(user => {
            users.push(new User(user.val()));
          })

          return users;
        }, error => {
          this.alertService.error('Impossible de récupérer les clients');
          return [];
        });
  }

  getUser(userId: string): Promise<User> {
    return firebase.database()
      .ref('/users/' + userId)
      .once('value')
      .then(user => {
        return new User(user.val());
      }, error => {
        this.alertService.error('Impossible de récupérer le client');
        return null;
      });
  }

  deleteUser(userId: string): Promise<boolean> {
    return firebase.database()
      .ref('/users/' + userId)
      .remove(error => {
        if (error) {
          this.alertService.error('Impossible de supprimer le client');
          return false;
        }

        this.alertService.success('Client supprimé avec succès');
        return true;
      });
  }

  createOrUpdateUser(user: User): Promise<boolean> {
    if (user.id) {
      return this.updateUser(user);
    }

    return this.createUser(user).then((userId) => {
      if (!userId) {
        return false;
      }

      user.id = userId;
      return this.updateUser(user);
    });
  }

  private updateUser(user: User): Promise<boolean> {
    return firebase.database()
      .ref('/users/' + user.id)
      .set(user, error => {
        if (error) {
          this.alertService.error('Impossible de modifier le client');
          return false;
        }

        this.alertService.success('Client modifié avec succès');
        return true;
      });
  }

  private createUser(user: User): Promise<string> { // Return user uid
    const tempFb = firebase.initializeApp(environment.firebase, 'Temporary App');

    return tempFb.auth().createUserWithEmailAndPassword(user.email, this.generatePassword()).then(firebaseUser => {
      this.alertService.success('Client créé avec succès');
      tempFb.auth().signOut();
      tempFb.delete();
      return firebaseUser.user.uid;
    }, error => {
      this.alertService.error('Impossible de créer le client');
      tempFb.delete();
      return null;
    });
  }

  private generatePassword(): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let password = '';

    for (let i = 0; i < 12; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    return password;
  }











  // PROJECTS

  getAllProjects(): Promise<Project[]> {
    return firebase.database()
      .ref('/projects')
      .once('value')
      .then(_projects => {
        const projects = [];

        _projects.forEach(user => {
          user.forEach(project => {
            projects.push(new Project(project.val()));
          })
        })

        return projects;
      }, error => {
        this.alertService.error('Impossible de récupérer les chantiers');
        return [];
      });
  }

  getUserProjects(userId: string): Promise<Project[]> {
    return firebase.database()
      .ref('/projects/' + userId)
      .once('value')
      .then(_projects => {
        const projects = [];

        _projects.forEach(project => {
          projects.push(new Project(project.val()));
        })

        return projects;
      }, error => {
        this.alertService.error('Impossible de récupérer les chantiers');
        return [];
      });
  }











  // INVOICES & QUOTES

  getAllInvoices(): Promise<Invoice[]> {
    return firebase.database()
      .ref('/invoices')
      .once('value')
      .then(_invoices => {
        const invoices = [];

        _invoices.forEach(user => {
          user.forEach(invoice => {
            invoices.push(new Invoice(invoice.val()));
          })
        })

        return invoices;
      }, error => {
        this.alertService.error('Impossible de récupérer les factures');
        return [];
      });
  }

  getAllQuotes(): Promise<Quote[]> {
    return firebase.database()
      .ref('/quotes')
      .once('value')
      .then(_quotes => {
        const quotes = [];

        _quotes.forEach(user => {
          user.forEach(quote => {
            quotes.push(new Quote(quote.val()));
          })
        })

        return quotes;
      }, error => {
        this.alertService.error('Impossible de récupérer les devis');
        return [];
      });
  }

  getUserInvoices(userId: string): Promise<Invoice[]> {
    return firebase.database()
      .ref('/invoices/' + userId)
      .once('value')
      .then(_invoices => {
        const invoices = [];

        _invoices.forEach(invoice => {
          invoices.push(new Invoice(invoice.val()));
        })

        return invoices;
      }, error => {
        this.alertService.error('Impossible de récupérer les factures');
        return [];
      });
  }

  getUserQuotes(userId: string): Promise<Quote[]> {
    return firebase.database()
      .ref('/quotes/' + userId)
      .once('value')
      .then(_quotes => {
        const quotes = [];

        _quotes.forEach(quote => {
          quotes.push(new Quote(quote.val()));
        })

        return quotes;
      }, error => {
        this.alertService.error('Impossible de récupérer les devis');
        return [];
      });
  }
}
