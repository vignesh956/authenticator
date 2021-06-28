import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SettingPagesService } from '../setting-pages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editUserData: boolean = false;
  users: any = {};

  userDetailsForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
  });


  constructor(
    private formBuilder: FormBuilder,
    private settingpage: SettingPagesService) { }


  ngOnInit(): void {
    this.users = this.settingpage.profileDate();
    console.log(this.users);
  }

  editDetails() {

    if (this.users) {
     this.userDetailsForm.get('name')?.setValue(this.users.name);
     this.userDetailsForm.get('phone')?.setValue(this.users.phone);

    }
    this.editUserData = true;
  }
  submitDetails() {}

  // submitDetails() {

  //   const payload = {
  //     'name': this.userDetailsForm.value.age,
 
  //   };
  //   this.userService.editUserInformation(payload).subscribe((resp) => {
  //     if (resp) {
  //       this.aboutUserDetails = resp;
  //       console.log(this.aboutUserDetails, "intrsssss")
  //       this.editUserData = false;
  //       if (this.introVideoFile && this.introVideoFile.length > 0) {
  //         this.uploadIntroVideo(this.introVideoFile)
  //       }
  //       this.is_loading = false;
  //     }
  //   });
  // }
  cancelEdit() {
    this.editUserData = false;
  }


}
