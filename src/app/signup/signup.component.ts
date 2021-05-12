import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { CredentialsService } from '../credentials.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  submitted = false;
  firstStep: boolean;
  stepTwo: boolean;
  stepthree: boolean;
  userData: any;
  emailError: any;
  phoneError: any;
  emailAlredyThere = false;
  otpverify: any;
  phoneError1: any;



  constructor(
    private formBuilder: FormBuilder,
    private cd: CredentialsService,
    public rter: Router){
    this.firstStep = true;
    this.stepTwo = false;
    this.stepthree = false;
  }



  registerForm = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
    phone: new FormControl('', [
      Validators.required,
      // Validators.pattern('^((\\-?)|0)?[0-9]{10}$')
      // Validators.minLength(13),
    ]),
  });

  verify = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    // this.getstudentDetails();

  }
  onSubmit(registerForm: any) {
    this.emailError = '';
    this.phoneError = '';
    this.userData = registerForm.value.email;
    this.submitted = true;
    const obj = registerForm.value;
    if (registerForm.invalid) { return; }

    this.cd.addUser(obj).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status === 201) {
        this.firstStep = false;
        this.stepTwo = true;
        this.sendotp();
      }
      if (resp.status === 500) {
        if (resp.error === 'auth/email-already-exists') {
          this.emailError = 'Email Already exists';
        }
        if (resp.error === 'auth/phone-number-already-exists') {
          this.phoneError = 'phone-number-already-exists';
        }
        if (resp.error === 'auth/invalid-phone-number') {
          this.phoneError = 'phone-number-invalid';
        }
      }
    }, err => {
      console.log(err);
      console.log(err.message);
    });
  }

  sendotp() {
    const email = {
      'email': this.registerForm.value.email,
    };
    this.cd.sendOtp(email).subscribe(res => {
      console.log(res, 'check your Email Id');
    });
  }

  resendOtp() {
    this.sendotp();
  }

  verifyotp(send: any) {
    const payload = {
      'email': this.registerForm.value.email,
      'otp': this.verify.value.number
    };
    this.cd.verifyOtp(payload).subscribe((res: any) => {
      if (res.status === 200) {
        this.firstStep = false;
        this.stepTwo = false;
        // this.stepthree = true;
        console.log("OTP Verified");
        this.rter.navigate(['/login']);
      }
      if (res.status === 500) {
        if (res.error === 'incorrect-otp') {
          this.otpverify = 'Incorrect OTP';
        }

      }
    });
  }
}
