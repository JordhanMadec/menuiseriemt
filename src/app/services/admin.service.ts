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

}
