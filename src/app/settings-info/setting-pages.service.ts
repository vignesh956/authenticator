import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingPagesService {

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  token: any;


  gettoken() {
    this.token = localStorage.getItem('token');
  }
  getusetprofile(token: any) {
    const authorization = {
      headers: new HttpHeaders()
        .set('Authorization', token)
    };
    return this.http.post('http://us-central1-etop-sign-0407.cloudfunctions.net/app/settings/get-profile', {}, authorization);
  }
  userprofileupdate(payload: any, token: any) {
    const authorization = {
      headers: new HttpHeaders()
        .set('Authorization', token)
    };
    console.log(authorization, 'authorization');
    return this.http.post('http://us-central1-etop-sign-0407.cloudfunctions.net/app/settings/update-profile', payload, authorization)
  }
  uploadstamp(stamp: any, abc: any) {

    const authorization = {
      headers: new HttpHeaders()
        .set('Authorization', abc)
    };
    // console.log(authorization, "header");

    return this.http.post('http://us-central1-etop-sign-0407.cloudfunctions.net/app/settings/update-stamp', stamp, authorization);
  }
  uploadsignature(stamp: any, abc: any) {

    const authorization = {
      headers: new HttpHeaders()
        .set('Authorization', abc)
    };
    // console.log(authorization, "header");

    return this.http.post('http://us-central1-etop-sign-0407.cloudfunctions.net/app/settings/update-signature', stamp, authorization);
  }
  uploadavatar(stamp: any, abc: any) {
    const authorization = {
      headers: new HttpHeaders()
        .set('Authorization', abc)
    };
    // console.log(authorization, "header");

    return this.http.post('http://us-central1-etop-sign-0407.cloudfunctions.net/app/settings/update-avatar', stamp, authorization);
  }
  getavatar(payload: any , token: any) {
    const authorization = {
      headers: new HttpHeaders()
        .set('Authorization', token)
    };
    console.log(authorization, "header");

    return this.http.post('http://us-central1-etop-sign-0407.cloudfunctions.net/app/settings/get-image-urls', payload, authorization);
  }
  
}

