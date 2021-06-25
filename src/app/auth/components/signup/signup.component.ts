import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { CredentialsService } from '../../servieses/credentials.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterNotificationService } from "../../../toaster-notification.service"
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/snackbar.service';

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
  emailError: any = false;
  phoneError: any = false;
  emailAlredyThere = false;
  otpverify: any = false;
  phoneError1: any;



  constructor(

    private formBuilder: FormBuilder,
    private cd: CredentialsService,
    public snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    private SpinnerService: NgxSpinnerService,
    public rter: Router ,
    public toaster: ToasterNotificationService) {
    this.firstStep = true;
    this.stepTwo = false;
    this.stepthree = false;
    // this.emailError= false;
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
    // this.emailError = '';
    // this.phoneError = '';

    console.log(this.registerForm.value , "hhhhhhhhhhhhhhhhhhhhhhhhhhhhh")

    this.userData = registerForm.value.email;
    this.submitted = true;
    const obj = registerForm.value;
    // if (registerForm.invalid) { return; }
    this.SpinnerService.show();

    this.cd.addUser(obj).subscribe((resp: any) => {
      this.SpinnerService.hide();
      console.log(resp);
      if (resp.status === 201) {
        this.firstStep = false;
        this.stepTwo = true;
        this.sendotp();
      }
      if (resp.status === 500) {
        if (resp.error === 'auth/email-already-exists') {
          // this.emailError = 'Email Already exists';
          this.snackbarService.openSnackBar('Email Already exists !!');
          // this.toaster.showError("Email Already exists !!", "");
        }
        if (resp.error === 'auth/phone-number-already-exists') {
          // this.phoneError = 'phone-number-already-exists';
          this.snackbarService.openSnackBar('phone-number-already-exists!!');
          // this.toaster.showError("phone-number-already-exists!!", "");
          this.emailError = false;
        }
        if (resp.error === 'auth/invalid-phone-number') {
          // this.phoneError = 'phone-number-invalid';
          this.snackbarService.openSnackBar('phone-number-invalid !!');
          // this.toaster.showError(" phone-number-invalid !!", "");
          this.emailError = false;
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
    // this.SpinnerService.show(); 
    this.cd.sendOtp(email).subscribe(res => {
      // this.SpinnerService.hide();  
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
    // this.SpinnerService.show();
    this.cd.verifyOtp(payload).subscribe((res: any) => {
      // this.SpinnerService.hide();
      if (res.status === 200) {
        this.firstStep = false;
        this.stepTwo = false;
        // this.stepthree = true;
        console.log("OTP Verified");
        // this.toaster.showError(" OTP Verified !!", "");
        this.snackbarService.openSnackBar(' OTP Verified !!');
        this.rter.navigate(['/login']);
      }
      if (res.status === 500) {
        if (res.error === 'incorrect-otp') {
          this.snackbarService.openSnackBar('Incorrect OTP   !!');
          // this.toaster.showError(" Incorrect OTP   !!", "");
          this.otpverify = 'Incorrect OTP';
        }

      }
    });
  }

  get email_get() { return this.registerForm.get('email'); }
  get phone_get() { return this.registerForm.get('phone'); }
  get number_get() { return this.verify.get('number'); }
  emailcheck() {

    if (this.email_get?.value == "") {

      this.emailError = false;

    }
  }
  phonenumbercheck() {
    if (this.phone_get?.value == "") {

      this.phoneError = false;
    }
  }


  otpNumber() {
    if (this.number_get?.value == "") {

      this.phoneError = false;
    }
  }
}
