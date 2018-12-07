import { Injectable, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import * as firebase from 'firebase/app';
import 'firebase/app';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs-compat/observable/fromPromise';
import { map, switchMap } from 'rxjs/operators';
import { Project } from '../models/project';
import { User } from '../models/user';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit{

  private currentUser: User;

  constructor(private alertService: AlertService, private databaseService: DatabaseService, private authService: AuthService) {
  }

  ngOnInit() {

  }

  assertIsAdmin(): Promise<boolean> {
    return this.databaseService.getCurrentUser().then(
      (user: User) => {
        console.log(user);
        if (user && user.isAdmin) {
          return true;
        }

        this.alertService.error('Vous n\'avez pas les droits adlinistrateur');
        return false;
      }
    )
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
