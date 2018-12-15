import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { Invoice } from '../models/invoice';
import { Project } from '../models/project';
import { Quote } from '../models/quote';
import { User } from '../models/user';
import { Utils } from '../shared/utils';
import { AlertService } from './alert.service';
import { DatabaseService } from './database.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private alertService: AlertService, private databaseService: DatabaseService, private storageService: StorageService) {
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

          return _.sortBy(users, ['firstName', 'lastName']);
        }, error => {
          this.alertService.error('Impossible de récupérer les clients');
          return [];
        });
  }

  createOrUpdateUser(user: User): Promise<boolean> {
    if (user.id) {
      return this.updateUser(user);
    }

    return this.createUser(user);
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

  private createUser(user: User): Promise<boolean> { // Return user uid
    const tempFb = firebase.initializeApp(environment.firebase, 'Temporary App');

    return tempFb.auth().createUserWithEmailAndPassword(user.email, Utils.generateToken()).then(firebaseUser => {
      tempFb.auth().signOut();
      tempFb.delete();

      user.id = firebaseUser.user.uid;

      this.alertService.success('Client créé avec succès')

      return this.updateUser(user);
    }, error => {
      this.alertService.error('Impossible de créer le client');
      tempFb.delete();
      return false;
    });
  }





  // PROJECTS

  public createOrUpdateProject(project: Project): Promise<boolean> {
    console.log(project);

    if (project.id) {
      return this.updateProject(project);
    }

    return this.createProject(project);
  }

  private updateProject(project: Project): Promise<boolean> {
    return firebase.database()
      .ref('/projects/' + project.ownerId + '/' + project.id)
      .set(project, error => {
        if (error) {
          this.alertService.error('Impossible de modifier le chantier');
          return false;
        }

        this.alertService.success('Chantier modifié avec succès');
        return true;
      });
  }

  private createProject(project: Project): Promise<boolean> {
    return this.databaseService.getUserProjects(project.ownerId).then((projects: Project[]) => {
      const projectIds = projects.map(_project => _project.id);
      let projectId = Utils.generateToken();

      while (projectIds.includes(projectId)) {
        projectId = Utils.generateToken();
      }

      project.id = projectId;

      this.alertService.success('Chantier créé avec succès')

      return this.updateProject(project);
    }, error => {
      this.alertService.error('Impossible de créer le chantier');
      return false;
    })
  }

  public deleteProject(ownerId: string, projectId: string): Promise<boolean> {
    return firebase.database()
      .ref('/projects/' + ownerId + '/' + projectId)
      .remove(error => {
        if (error) {
          this.alertService.error('Impossible de supprimer le chantier');
          return false;
        }

        this.deleteProjectInvoices(ownerId, projectId);
        this.deleteProjectQuotes(ownerId, projectId);

        this.alertService.success('Chantier supprimé avec succès');

        return true;
      });
  }

  public deleteProjectInvoices(ownerId: string, projectId: string): Promise<boolean> {
    return this.databaseService.getProjectInvoices(ownerId, projectId).then((invoices: Invoice[]) => {
      invoices.forEach((invoice: Invoice) => {
        this.storageService.deleteInvoice(ownerId, invoice.fileName).then(deleteFileRes => {
          if (!deleteFileRes) { return false; }

          this.deleteInvoice(ownerId, invoice.id).then(res => {
            if (!res) { return false; }
          })
        });
      });

      return true;
    });
  }

  public deleteProjectQuotes(ownerId: string, projectId: string): Promise<boolean> {
    return this.databaseService.getProjectQuotes(ownerId, projectId).then((quotes: Quote[]) => {
      quotes.forEach((quote: Quote) => {
        this.storageService.deleteQuote(ownerId, quote.fileName).then(deleteFileRes => {
          if (!deleteFileRes) { return false; }

          this.deleteQuote(ownerId, quote.id).then(res => {
            if (!res) { return false; }
          })
        });
      });

      return true;
    });
  }





  // INVOICES & QUOTES

  deleteInvoice(ownerId: string, invoiceId: string): Promise<boolean> {
    return firebase.database()
      .ref('/invoices/' + ownerId + '/' + invoiceId)
      .remove(error => {
        if (error) {
          this.alertService.error('Impossible de supprimer la facture');
          return false;
        }

        this.alertService.success('Facture supprimée avec succès');

        return true;
      });
  }

  deleteQuote(ownerId: string, quoteId: string): Promise<boolean> {
    return firebase.database()
      .ref('/quotes/' + ownerId + '/' + quoteId)
      .remove(error => {
        if (error) {
          this.alertService.error('Impossible de supprimer le devis');
          return false;
        }

        this.alertService.success('Devis supprimé avec succès');

        return true;
      });
  }
}
