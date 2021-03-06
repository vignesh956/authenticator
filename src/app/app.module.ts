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
import { ChangePasswordComponent } from './settings-info/change-password/change-password.component';
import { UploadSignatureComponent } from './settings-info/upload-signature/upload-signature.component';
import { UploadStampComponent } from './settings-info/upload-stamp/upload-stamp.component';
import { LogoutComponent } from './settings-info/logout/logout.component';
import { InboxComponent } from './manage-section/inbox/inbox.component';
import { OutboxComponent } from './manage-section/outbox/outbox.component';
import { TrashComponent } from './manage-section/trash/trash.component';
import { AchiveComponent } from './manage-section/achive/achive.component';
import { DraftComponent } from './manage-section/draft/draft.component';
import { ProfileComponent } from './settings-info/profile/profile.component';
import { SettingsModule } from './settings/settings.module';
import { BackButtonComponent } from './settings-info/back-button/back-button.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FoooterComponent } from './foooter/foooter.component';



@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    MenuComponent,
    HomeComponent,
    CreateDocumentComponent,
    ReportsComponent,
    SettingsComponent,
    ChangePasswordComponent,
    UploadSignatureComponent,
    UploadStampComponent,
    LogoutComponent,
    InboxComponent,
    OutboxComponent,
    TrashComponent,
    AchiveComponent,
    DraftComponent,
    ProfileComponent,
    BackButtonComponent,
    SidebarComponent,
    HeaderComponent,
    FoooterComponent,

  ],
    imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    AuthModule,
    SettingsModule,
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
   SidebarModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }