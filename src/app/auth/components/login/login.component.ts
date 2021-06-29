import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CredentialsService } from '../../servieses/credentials.service';
import { ToasterNotificationService } from "../../../toaster-notification.service";
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  verifiedemail: boolean;
  emailError: any;
  phoneError: any;
  @Input() name: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    private cd: CredentialsService,
    private SpinnerService: NgxSpinnerService,
    public toaster: ToasterNotificationService,
    public router: Router) {
    this.submitted = false;
    this.verifiedemail = true;
  }

  constoptions = { positionClass: 'toast-custom' };

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
        // 'uid': res.user?.emailVerified;
        'uid': res.user?.uid
      };
      this.cd.sendUid(uid).subscribe((resp: any) => {
        this.SpinnerService.hide();
        console.log(resp);
        if (resp.status === 200) {
          console.log(resp, 'login');
          const s = resp?.token;
          console.log(resp?.token, "token");
          localStorage.setItem('token', s);
          // tslint:disable-next-line:no-shadowed-variable
          const uid = res.user?.uid;
          localStorage.setItem('uid', uid);
          this.router.navigate(['side']);
        }
        this.router.navigate(['side']);
        if (resp.status === 404) {
          if (resp.error === 'required-fields') {
          }
        }
      });
    }, (err) => {
      console.log(err);
      this.SpinnerService.hide();

      if (err.code === 'auth/user-not-found') {

        this.snackbarService.openSnackBar('Email not found !!');

        // this.toaster.showError("Email not found !!", "", );
        // this.emailError = 'Email Already exists';
      }
      if (err.code === 'auth/wrong-password') {
        // this.toaster.showError("Password Invalid !!", "");
        this.snackbarService.openSnackBar('Password Invalid !!');
        // this.phoneError = 'Password Invalid';
      }


      if (err.code === 'auth/too-many-requests') {
        // this.toaster.showError("Password Invalid !!", "");
        this.snackbarService.openSnackBar('Too-many-requests !!');
        // this.phoneError = 'Password Invalid';
      }

    });

  }
}
