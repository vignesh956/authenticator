import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from '../auth/components/forgot-password/forgot-password.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { SignupComponent } from '../auth/components/signup/signup.component';
import { VerifyOtpComponent } from '../auth/components/verify-otp/verify-otp.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MaterialModule } from '../material/material.module';

import { NgxSpinnerModule } from "ngx-spinner";

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { AuthRoutingModule } from './auth-routing.module';
import { SidebarModule } from 'ng-sidebar';


@NgModule({
  declarations: [
    VerifyOtpComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    NgxSpinnerModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ToastrModule,
    SidebarModule
  ]
})
export class AuthModule { }
