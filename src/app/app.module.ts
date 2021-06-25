import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MaterialModule } from './material/material.module';
import { SidebarModule } from 'ng-sidebar';

import { NgxSpinnerModule } from "ngx-spinner";

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from '../app/auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    MenuComponent,
    HomeComponent,
    CreateDocumentComponent,
    ReportsComponent,
    SettingsComponent,

  ],
    imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    SidebarModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    HttpClientModule,
    NgxSpinnerModule  ,
    AppRoutingModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule ,// Only required for storage features
   SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
