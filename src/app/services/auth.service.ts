import { EventEmitter, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {

  private user: Observable<User>;
  private userDetails: User;

  private userSubscription: Subscription;

  private _isAuthenticatedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, public fireAuth: AngularFireAuth) {
    this.user = this.fireAuth.authState;
  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.userDetails = user;
          this._isAuthenticatedEmitter.emit(true);
        } else {
          this.userDetails = null;
          this._isAuthenticatedEmitter.emit(false);
        }
      }
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState.pipe(
      take(1),
      map(user => user !== null)
    );
  }

  login(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          this.isAuthenticatedEmitter.emit(true);
          resolve(user);
        }, error => reject(error))
    })
  }

  logout() {
    this.fireAuth.auth.signOut().then(
      res => {
        this.userDetails = null;
        this.isAuthenticatedEmitter.emit(false);
        this.router.navigate(['login'])
      }
    ).catch(
      error => console.log(error)
    );
  }

  signup(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log('CREATE USER', user);
          resolve(user);
        }, error => reject(error))
    })
  }

  get isAuthenticatedEmitter(): EventEmitter<boolean> {
    return this._isAuthenticatedEmitter;
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
