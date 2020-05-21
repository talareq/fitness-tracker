import {AuthData} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.action';
import * as Auth from './auth.actions';


@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private aFauth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uIService: UiService,
    private store: Store<fromRoot.State>,
  ) {}

  initAuthListener() {
    this.aFauth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnathenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.aFauth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        }).catch(error => {
      this.store.dispatch(new UI.StopLoading());
      this.uIService.showSnackBar(error.messsage, null, {
        duration: 3000
      });
    });

  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.aFauth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      }).catch(error => {
      this.store.dispatch(new UI.StopLoading());
      this.uIService.showSnackBar(error.message, null, {
        duration: 3000
      });
      });
  }

  logout() {
    this.aFauth.auth.signOut();
  }
}
