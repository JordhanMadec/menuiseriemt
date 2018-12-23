import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import * as _ from 'lodash';
import { DocumentType } from '../models/document';
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
    return this.getUser(userId);
  }

  getUser(userId: string): Promise<User> {
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

  getAllDocuments(type: DocumentType): Promise<Invoice[] | Quote[]> {
    const documentType = type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return firebase.database()
      .ref(documentType)
      .once('value')
      .then(_documents => {
        const documents: Invoice[] | Quote[] = [];

        _documents.forEach(user => {
          user.forEach(document => {
            if (document.val().type === DocumentType.INVOICE) {
              documents.push(new Invoice(document.val()));
            } else {
              documents.push(new Quote(document.val()));
            }
          })
        })

        return _.reverse(_.sortBy(documents, ['lastUpdate']));
      }, error => {
        this.alertService.error('Impossible de récupérer les documents');
        return [];
      });
  }

  getUserDocuments(userId: string, type: DocumentType): Promise<Invoice[] | Quote[]> {
    const documentType = type === DocumentType.INVOICE ? 'invoices' : 'quotes';
    const documents: Invoice[] | Quote[] = [];

    return firebase.database()
      .ref(documentType + '/' + userId)
      .once('value')
      .then(res => {
        res.forEach(_document => {
          let document: Invoice | Quote = null;

          if (_document.val().type === DocumentType.INVOICE) {
            document = new Invoice(_document.val());
          } else {
            document = new Quote(_document.val());
          }
          document.id = _document.key;
          documents.push(document);
        });

        return _.reverse(_.sortBy(documents, ['lastUpdate']));
      }, () => {
        this.alertService.error('Impossible de récupérer les documents');
        return documents;
      });
  }

  getUserDocument(userId: string, invoiceId: string, type: DocumentType): Promise<Invoice | Quote> {
    const documentType = type === DocumentType.INVOICE ? 'invoices' : 'quotes';

    return firebase.database()
      .ref(documentType + '/' + userId + '/' + invoiceId)
      .once('value')
      .then(document => {
        if (document.val().type === DocumentType.INVOICE) {
          return new Invoice(document.val());
        } else {
          return new Quote(document.val());
        }
      }, () => {
        this.alertService.error('Impossible de récupérer le document');
        return null;
      });
  }

  getProjectDocuments(userId: string, projectId: string, type: DocumentType): Promise<Invoice[] | Quote[]> {
    return this.getUserDocuments(userId, type).then(
      (_documents: Invoice[] | Quote[]) => {
        const documents = _documents.filter(invoice => invoice.projectId + '' === projectId);
        return _.sortBy(documents, ['lastUpdate']);
      }
    )
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

        return _.reverse(_.sortBy(projects, ['lastUpdate']));
      }, error => {
        this.alertService.error('Impossible de récupérer les chantiers');
        return [];
      });
  }

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

        return _.reverse(_.sortBy(projects, ['lastUpdate']));
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
