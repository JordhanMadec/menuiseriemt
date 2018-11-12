import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  getCurrentUser(): Promise<User> {
    const userId = firebase.auth().currentUser.uid;
    return firebase.database()
      .ref('/users/' + userId)
      .once('value')
      .then(user => new User(user.val())
    );
  }
}
