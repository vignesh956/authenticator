import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { CredentialsService } from '../credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  verifiedemail: boolean;
  constructor(private formBuilder: FormBuilder,
    private cd: CredentialsService) {
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

  // email: any = this.loginForm.value.email;
  // password: any = this.loginForm.value.password;
  ngOnInit(): void {

  }



  onSubmit(loginForm: any): void {
    this.submitted = true;
    if (loginForm.invalid) { return; }

    this.cd.login(this.loginForm.value.email, this.loginForm.value.password).then(res => {
      var xyz = res.user?.emailVerified;
      // const uid = res.user?.uid;
      // console.log(uid);
      const uid = {
        'uid': res.user?.emailVerified
      };

      // if (!res.user?.emailVerified) {
      //   alert('stop');
      //   return;
      // }
      this.cd.sendUid(uid).subscribe((resp: any) => {
        console.log(resp);


        if (resp.status === 200) {
          alert('UID sent Successfull');
          const s = resp.data?.token;
          localStorage.setItem('token', s);
        }
        if (resp.status === 404) {
          if (resp.error === 'required-fields') {
            alert('required-fields');
          }
        }



      });

    }, (error: any) => {

    });

  }


  // sendUId() {
  //   const a = localStorage.getItem('user');
  //   const user = a ? JSON.parse(a) : [];
  //   console.log(user);
  //   const xyz = user.emailVerified;
  //   const uid = user.uid;
  //   console.log(xyz);
  //   if (!xyz === this.verifiedemail) {
  //     alert('stop');
  //     return;

  //   }
  //   this.cd.sendUid(uid).subscribe(res => {
  //     console.log(res);
  //   });

  // }
}
