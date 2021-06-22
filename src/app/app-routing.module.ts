import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'signup' , component: SignupComponent},
  {path: 'forget-password' , component: ForgotPasswordComponent},
  {path: 'dashboard' , component: DashbordComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'report' , component: ReportsComponent},
  {path: 'setting' , component: SettingsComponent},
  {path: 'menu' , component: MenuComponent},
  {path: 'create-document' , component: CreateDocumentComponent},
  // {path: '' ,  redirectTo:'signup', pathMatch: 'full'},
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
