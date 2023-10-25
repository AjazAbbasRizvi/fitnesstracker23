import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';
import { User } from './user.model';
import { authData } from './auth-data.model';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../../app/shared/uiaction';
import * as Auth from 'src/app/auth/authngrx/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private user: User;
  private isAuthenticated: boolean = false;
  public userId = new Subject<string>();
  public usId: string;
  public previousUrl: string;

  constructor(
    private router: Router,
    private UIService: UiService,
    private store: Store<{ ui: fromRoot.State }>
  ) {
    const firebaseConfig = environment.firebase;
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
  }

  registerUser(authdata: authData) {
    this.store.dispatch(new UI.StartLoading());
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, authdata.email, authdata.password)
      .then((result) => {
        this.store.dispatch(new Auth.SetUnAuthenticated());
        this.router.navigate(['/login']);
        this.UIService.ShowSnackBar(
          'Account Created Sucessfully, LogIn',
          null,
          4000
        );
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.UIService.ShowSnackBar(error.message, null, 4000);
      });
  }

  initAuthListner() {
    const auth = getAuth();
    auth.beforeAuthStateChanged((user) => {
      localStorage.setItem('userId', user.email);
      this.usId = user.email;
      if (user) {
        localStorage.setItem('userId', user.email);
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new Auth.SetUnAuthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  login(authdata: authData) {
    this.store.dispatch(new UI.StartLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, authdata.email, authdata.password)
      .then((result) => {
        localStorage.setItem('userId', result.user.email);
        this.userId.next(this.usId);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.UIService.ShowSnackBar(error.message, null, 4000);
      });
  }

  logout() {
    this.user = null;
    localStorage.removeItem('userId');
    this.store.dispatch(new Auth.SetUnAuthenticated());
    this.router.navigate(['/login']);
  }
  private authSuccess() {}
}
