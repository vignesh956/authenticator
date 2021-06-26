import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  changePassword: boolean = false;
  signature: boolean = false;
  logout: boolean = false;
  stampUpload: boolean = false;
  profile : boolean = false;

  constructor() {

  }


  selectedHero?: any;

  ngOnInit(): void {
  }
  onSelect(hero: any): void {
    this.selectedHero = hero;
  }

}
