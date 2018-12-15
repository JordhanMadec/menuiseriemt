import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';
import { User } from '../models/user';
import { Utils } from '../shared/utils';
import { AlertService } from './alert.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private alertService: AlertService, private databaseService: DatabaseService) {
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
}
