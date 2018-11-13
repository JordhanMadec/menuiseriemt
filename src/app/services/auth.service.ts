import { EventEmitter, Injectable, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../models/user';
import { AlertService } from './alert.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {

  private firebaseUser: Observable<firebase.User>;
  private _currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private userSubscription: Subscription;

  private _isAuthenticatedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router,
              public fireAuth: AngularFireAuth,
              private databaseService: DatabaseService,
              private alertService: AlertService,
              private ngZone: NgZone) {
    this.firebaseUser = this.fireAuth.authState;

    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.databaseService.getCurrentUser().then(
            userData => {
              this._isAuthenticatedEmitter.emit(true);
              this._currentUser.next(userData);
            }
          );
        } else {
          this._isAuthenticatedEmitter.emit(false);
          this._currentUser.next(null);
        }
      }
    );
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.refreshCurrentUser();
        } else {
          this._isAuthenticatedEmitter.emit(false);
          this._currentUser.next(null);
        }
      }
    );
  }

  refreshCurrentUser() {
    this.databaseService.getCurrentUser().then(
      userData => {
        this._isAuthenticatedEmitter.emit(true);
        this._currentUser.next(userData);
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
        .then(res => {
          this.refreshCurrentUser();
          resolve(res);
        }, error => {
          this.alertService.error('Identifiant ou mot de passe incorrect');
          reject(error);
        })
    })
  }

  logout() {
    this.fireAuth.auth.signOut().then(
      res => {
        this._currentUser.next(null);
        this.isAuthenticatedEmitter.emit(false);
        this.ngZone.run(() => this.router.navigate(['login']));
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }

  signup(user: User, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, password)
        .then(fbUser => {
          user.id = fbUser.user.uid;
          this.databaseService.createOrUpdateUser(user)
            .then(res => resolve(res));
        }, error => reject(error))
    })
  }

  get isAuthenticatedEmitter(): EventEmitter<boolean> {
    return this._isAuthenticatedEmitter;
  }


  get currentUser(): Observable<User> {
    return this._currentUser;
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
