import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,   // Inject Firestore service
    public angularFireAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    this.angularFireAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }
  authState: any;
  // Sign in with email/password
  // sigIn(email: any, password: any) {
  // this.angularFireAuth.signInWithEmailAndPassword(email, password)
  // .then( user => {
  // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa');
  // this.authState = user;
  // })
  // .catch(err => {
  // console.log('Something went wrong:', err.message);
  // });
  // }
  isLOggrdIn = false;


  addUser(obj: any) {
    return this.http.post('https://us-central1-etop-sign-0407.cloudfunctions.net/app/user/create', obj);
  }

  sendOtp(email: any) {
    return this.http.post('https://us-central1-etop-sign-0407.cloudfunctions.net/app/user/send-otp', email);
  }

  resendOtp(payload: any) {
    console.log(payload, "resend otp");
    return this.http.post('https://us-central1-etop-sign-0407.cloudfunctions.net/app/user/send-otp', payload);
  }
  verifyOtp(payload: any) {
    return this.http.post('https://us-central1-etop-sign-0407.cloudfunctions.net/app/user/verify-otp', payload);
  }
  getuser() {
    return this.http.get('https://us-central1-etop-sign-0407.cloudfunctions.net/app/user');
  }
  loginUser(payload: any) {
    return this.http.post('https://us-central1-etop-sign-0407.cloudfunctions.net/app/user/sign-in', payload);
  }

  updatepassword(newPassword: any) {
    return this.http.post('https://us-central1-etop-sign-0407.cloudfunctions.net/app/user/forgot-password', newPassword);
  }
  login(email: string, password: string) {
    console.log(email);
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.angularFireAuth.signOut();
    localStorage.removeItem('user');
  }

  sendUid(uid: any) {
    return this.http.post('https://us-central1-etop-sign-0407.cloudfunctions.net/app/user/sign-in', uid);
  }



 
}

