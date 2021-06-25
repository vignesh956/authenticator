import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { CredentialsService } from '../../servieses/credentials.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterNotificationService } from "../../../toaster-notification.service"

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private cd: CredentialsService,
    private SpinnerService: NgxSpinnerService,
    public rter: Router,
    public toaster: ToasterNotificationService) { }

  ngOnInit(): void {
  }

  // sendotp() {
  //   const email = {
  //     'email': this.registerForm.value.email,
  //   };
  //   this.cd.sendOtp(email).subscribe(res => {
  //     console.log(res, 'check your Email Id');
  //   });
  // }
  // resendOtp() {
  //   this.sendotp();
  // }

  // verifyotp(send: any) {

  //   const payload = {
  //     'email': this.registerForm.value.email,
  //     'otp': this.verify.value.number
  //   };
  //   this.cd.verifyOtp(payload).subscribe((res: any) => {
  //     if (res.status === 200) {
  //       this.firstStep = false;
  //       this.stepTwo = false;
  //       console.log("OTP Verified");
  //       this.rter.navigate(['/login']);
  //     }
  //     if (res.status === 500) {
  //       if (res.error === 'incorrect-otp') {
  //         this.otpverify = 'Incorrect OTP';
  //       }

  //     }
  //   });
  // }

}
