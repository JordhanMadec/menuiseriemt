import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private user: Observable<User>;
  private userDetails: User;

  private userSubscription: Subscription;

  constructor(private router: Router, public fireAuth: AngularFireAuth) {
    this.user = this.fireAuth.authState;

    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  isAuthenticated(): boolean {
    return this.userDetails !== null;
  }

  login(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  logout() {
    this.fireAuth.auth.signOut().then(
      res => {
        this.userDetails = null;
        this.router.navigate(['login'])
      }
    ).catch(
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
