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
  emailError: any;
  phoneError:any;

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



  ngOnInit(): void {

  }



  onSubmit(loginForm: any): void {
    this.emailError = '';
    this.phoneError = '';
    this.submitted = true;
    if (loginForm.invalid) { return; }
    console.log(this.loginForm);

    this.cd.login(this.loginForm.value.email, this.loginForm.value.password).then((res: any) => {
      console.log(res, 'sssssssssssssssssssss');

 
      const uid = {
        'uid': res.user?.emailVerified
      };
      this.cd.sendUid(uid).subscribe((resp: any) => {
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

  
    },(err)=>{
      console.log(err);
      if (err.code === 'auth/user-not-found') {
        this.emailError = 'Email Already exists';
      }
      if (err.code === 'auth/wrong-password') {
        this.phoneError = 'Password Invalid';
      }
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
