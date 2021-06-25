import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(public rter: Router,) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const tokenValue = localStorage.getItem('token');
    console.log(tokenValue , "tokens data");
    
    if ( tokenValue) {
      alert('token is exist');
      // this.rter.navigate(['dashbord']);
    } else {
      alert('token is not exist');
      this.rter.navigate(['/login']);
    }


    return true;
  }

}
