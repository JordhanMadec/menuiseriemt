import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';
import { User } from '../models/user';
import { AlertService } from './alert.service';

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

  public createOrUpdateProject(project: Project): Promise<boolean> {
    if (project.id) {
      return this.updateProject(project);
    }

    // TODO: create project
    return null;
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
}
