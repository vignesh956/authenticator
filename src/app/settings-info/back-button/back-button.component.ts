import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  constructor(private _location: Location) { }
  back(){
    this._location.back();
      }
  ngOnInit(): void {
  }

}
