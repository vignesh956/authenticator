import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsService } from '../credentials.service';
import { NgxSpinnerService } from "ngx-spinner";

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


  newPassword = new FormGroup({
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
    private SpinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private cd: CredentialsService,
    public rter: Router) {
    this.submitted = false;
    this.firstStep = true;
    this.stepTwo = false;
    this.stepthree = false;
  }
  get f() { return this.forgetPassword.controls; }
  get g() { return this.newPassword.controls; }
  ngOnInit(): void { }
  onSubmit(forgetPassword: any) {
    this.userData = forgetPassword.value.email;
  }
  sendotp(forgetPassword: any) {
    this.userData = forgetPassword.value.email;
    const email = {
      'email': this.forgetPassword.value.email
    };
    this.SpinnerService.show(); 

    this.cd.sendOtp(email).subscribe((res: any) => {
      this.SpinnerService.hide();  
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
    this.SpinnerService.show();
    const payload = {
      'email': this.forgetPassword.value.email
    };
    this.cd.resendOtp(payload).subscribe((res: any) => {
      this.SpinnerService.hide();
      if (res.status === 200) {
        console.log(res, 'check your Email Id cccccccccccccccc');
      }
    });
  }
  verifyotp(send: any) {

    const payload = {
      'email': this.forgetPassword.value.email,
      'otp': this.verify.value.number
    };

    this.SpinnerService.show();
    this.cd.verifyOtp(payload).subscribe((res: any) => {
      this.SpinnerService.hide();
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
      'password': this.newPassword.value.password
    };
    this.SpinnerService.show();
    this.cd.updatepassword(newPassword).subscribe((res: any) => {
      if (res.status === 200) {
        this.SpinnerService.hide();
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
