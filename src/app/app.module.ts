import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavListComponent } from './navigation/side-nav-list/side-nav-list.component';
import {AuthService} from './auth/auth.service';
import {TrainingService} from './training/training.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {UiService} from './shared/ui.service';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SideNavListComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
