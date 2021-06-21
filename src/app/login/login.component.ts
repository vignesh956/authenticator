import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CredentialsService } from '../credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  verifiedemail: boolean;
  emailError: any;
  phoneError: any;

  constructor(
    private formBuilder: FormBuilder,
    private cd: CredentialsService,
    private SpinnerService: NgxSpinnerService,) {
    this.submitted = false;
    this.verifiedemail = true;
  }
  get f() { return this.loginForm.controls; }
  submitted: boolean;
  isSignedIn = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$')]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
  }
  onSubmit(loginForm: any): void {
    this.emailError = '';
    this.phoneError = '';
    this.submitted = true;
    if (loginForm.invalid) { return; }
    console.log(this.loginForm);
    this.SpinnerService.show();
    this.cd.login(this.loginForm.value.email, this.loginForm.value.password).then((res: any) => {
      this.SpinnerService.hide();
      console.log(res, 'sssssssssssssssssssss');
      const uid = {
        'uid': res.user?.emailVerified
      };
      this.cd.sendUid(uid).subscribe((resp: any) => {
        this.SpinnerService.hide();
        console.log(resp);
        if (resp.status === 200) {
          const s = resp.data?.token;
          localStorage.setItem('token', s);
        }
        if (resp.status === 404) {
          if (resp.error === 'required-fields') {
          }
        }
      });
    }, (err) => {
      console.log(err);
      this.SpinnerService.hide();

      if (err.code === 'auth/user-not-found') {
        this.emailError = 'Email Already exists';
      }
      if (err.code === 'auth/wrong-password') {
        this.phoneError = 'Password Invalid';
      }
    });

  }
}
