import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { DocumentType } from '../models/document';
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
    user.lastUpdate = (new Date()).toString();

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

  createOrUpdateProject(project: Project): Promise<boolean> {
    project.lastUpdate = (new Date()).toString();

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

  deleteProject(ownerId: string, projectId: string): Promise<boolean> {
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

  deleteProjectInvoices(ownerId: string, projectId: string): Promise<boolean> {
    return this.databaseService.getProjectInvoices(ownerId, projectId).then((invoices: Invoice[]) => {
      invoices.forEach((invoice: Invoice) => {
        this.storageService.deleteDocument(ownerId, invoice.fileName, DocumentType.INVOICE).then(deleteFileRes => {
          if (!deleteFileRes) { return false; }

          this.deleteDocument(invoice).then(res => {
            if (!res) { return false; }
          })
        });
      });

      return true;
    });
  }

  deleteProjectQuotes(ownerId: string, projectId: string): Promise<boolean> {
    return this.databaseService.getProjectQuotes(ownerId, projectId).then((quotes: Quote[]) => {
      quotes.forEach((quote: Quote) => {
        this.storageService.deleteDocument(ownerId, quote.fileName, DocumentType.QUOTE).then(deleteFileRes => {
          if (!deleteFileRes) { return false; }

          this.deleteDocument(quote).then(res => {
            if (!res) { return false; }
          })
        });
      });

      return true;
    });
  }





  // INVOICES & QUOTES

  deleteDocument(document: Invoice | Quote): Promise<boolean> {
    const documentType = document.type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return this.storageService.deleteDocument(document.ownerId, document.fileName, document.type).then(deleteFileRes => {
      if (!deleteFileRes) {
        return false;
      }

      return firebase.database()
        .ref(documentType + '/' + document.ownerId + '/' + document.id)
        .remove(error => {
          if (error) {
            this.alertService.error('Impossible de supprimer le document');
            return false;
          }

          this.alertService.success('Document supprimé avec succès');

          return true;
        });
    });
  }

  updateDocument(document: Invoice | Quote): Promise<boolean> {
    document.lastUpdate = (new Date()).toString();

    const documentType = document.type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return firebase.database()
      .ref('/' + documentType + '/' + document.ownerId + '/' + document.id)
      .set(document, error => {
        if (error) {
          this.alertService.error('Impossible de modifier le document');
          return false;
        }

        this.alertService.success('Document modifié avec succès');
        return true;
      });
  }
}
