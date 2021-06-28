import { HttpClient } from '@angular/common/http';
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



  profileDate() {
    return {
      name: 'T.vignesh',
      phone: +917396989281,
      profile: '../../assets/live-person-icon.png',
      email: 'tulasigarivignesh1999@gmail.com'
    };

  }


  addimg(fd: any  ) {
    return this.http.post('http://localhost:3000/users', fd );
  }

}
