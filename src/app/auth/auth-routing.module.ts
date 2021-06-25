import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from '../auth/components/forgot-password/forgot-password.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { SignupComponent } from '../auth/components/signup/signup.component';
import { VerifyOtpComponent } from '../auth/components/verify-otp/verify-otp.component';


const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'signup' , component: SignupComponent},
  {path: 'forget-password' , component: ForgotPasswordComponent},
  {path: 'verify-otp' , component: VerifyOtpComponent},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
