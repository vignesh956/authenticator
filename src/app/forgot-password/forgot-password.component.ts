import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsService } from '../credentials.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitted: boolean;
  userData: any;
  otpIncorrect: any;
  abc: any;
  passwordInvalid: any;
  forgetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$')]),
    password: new FormControl('', [Validators.required]),
  });

  verify = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });


  firstStep: boolean;
  stepTwo: boolean;
  stepthree: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private cd: CredentialsService,
    public rter: Router) {
    this.submitted = false;
    this.firstStep = true;
    this.stepTwo = false;
    this.stepthree = false;
  }
  get f() { return this.forgetPassword.controls; }
  ngOnInit(): void { }
  onSubmit(forgetPassword: any) {
    this.userData = forgetPassword.value.email;
    this.sendotp();
  }
  sendotp() {
    const email = {
      'email': this.forgetPassword.value.email
    };
    this.cd.sendOtp(email).subscribe((res: any) => {
      if (res.status === 200) {
        this.firstStep = false;
        this.stepTwo = true;
        console.log(res, 'check your Email Id');
      }
      if (res.status === 404) {
        if (res.error === 'invalid-email') {
          this.abc = 'invalid-email';
          console.log(this.abc);

        }

      }

    });
  }








  resendOtp() {
    this.sendotp();
  }

  verifyotp(send: any) {
    const payload = {
      'email': this.forgetPassword.value.email,
      'otp': this.verify.value.number
    };

    this.cd.verifyOtp(payload).subscribe((res: any) => {
      if (res.status === 200) {
        this.firstStep = false;
        this.stepTwo = false;
        this.stepthree = true;
        console.log("OTP Verified Successfully");
      }
      if (res.status === 500) {
        if (res.error === 'incorrect-otp') {
          this.otpIncorrect = 'incorrect OTP';
        }

      }
    });
  }




  createNewPassword(forgetPassword: any) {
    const newPassword = {
      'email': this.forgetPassword.value.email,
      'password': this.forgetPassword.value.password
    };
    this.cd.updatepassword(newPassword).subscribe((res: any) => {
      if (res.status === 200) {

        console.log(res, 'Password Updated Successfully');
        this.rter.navigate(['/login']);
      }
      if (res.status === 500) {
        if (res.error === 'auth/wrong-password') {
          this.passwordInvalid = 'Password must be 6 character';
        }

      }
    });
  }
}
