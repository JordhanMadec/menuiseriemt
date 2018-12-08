import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
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
          const users: User[] = [];

          _users.forEach(user => {
            users.push(new User(user.val()));
          })

          return users;
        }, error => {
          this.alertService.error('Impossible de récupérer les clients');
          return [];
        });
  }

}
