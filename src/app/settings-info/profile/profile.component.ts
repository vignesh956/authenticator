import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/auth/servieses/credentials.service';
import { SnackbarService } from 'src/app/snackbar.service';
import { SettingPagesService } from '../setting-pages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editUserData: boolean = false;
  selectedFile: any
  imageError: any;
  isImageSaved: boolean = false;
  cardImageBase64: any;
  token: any;
  userid: any;
  url: any
  users: any = {
    // displayName: 'hai',
    // phoneNumber: '+919390206384',
    // email: 'tvigneshkp1999@gmail.com'
  };

  userDetailsForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
  });
  // get f() { return this.userDetailsForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private settingpage: SettingPagesService,
    private snackbarService: SnackbarService,
    private router: Router) { }


  ngOnInit(): void {

    this.profileData();
  }

  profileData() {
    this.token = localStorage.getItem('token');
    this.userid = localStorage.getItem('uid');

    const payload = {
      docID: 'avatar-'+ this.userid
    };

    this.settingpage.getusetprofile(this.token).subscribe((resp: any) => {
      console.log(resp, 'user profile data');
      if (resp.status === 200) {
        this.users = resp.profile;
        // this.snackbarService.openSnackBar('getting data successfully!');
      }
      if (resp.status === 500) {
        // this.snackbarService.openSnackBar('unable to verify token !!');
        // localStorage.clear();
        // this.router.navigate(['/login']);
      }

    });
    this.settingpage.getavatar(payload, this.token).subscribe((resp: any) => {
      if (resp.status === 200) {
        console.log(resp , 'DOCID');
        
        // this.snackbarService.openSnackBar('updated successfully !!');
        this.url = resp.url;
      }
      if (resp.status === 500) {
        // this.snackbarService.openSnackBar('unable to verify token');
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }



  editDetails() {

    if (this.users) {
      this.userDetailsForm.get('name')?.setValue(this.users.name);
      this.userDetailsForm.get('phone')?.setValue(this.users.phone);

    }
    this.editUserData = true;
  }
  submitDetails() {
    const payload = {
      displayName: this.userDetailsForm.value.name,
      phoneNumber: this.userDetailsForm.value.phone
    };
    this.settingpage.userprofileupdate(payload, this.token).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status === 200) {
        this.snackbarService.openSnackBar('updated successfully !!');
      }
      if (resp.status === 500) {
        this.snackbarService.openSnackBar('unable to verify token');
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    });
    this.profileData();
    this.onupload();
    this.editUserData = false;
  }
  cancelEdit() {
    this.editUserData = false;
  }
  onfileselet(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.imageError = null;
    if (event.target.files && event.target.files[0]) {
      // Size Filter Bytes
      const allowed_types = ['image/png', 'image/jpeg'];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        const imgBase64Path = e.target.result;
        this.cardImageBase64 = imgBase64Path;
        console.log(this.cardImageBase64);

        this.isImageSaved = true;
        // this.previewImagePath = imgBase64Path;

      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onupload() {
    const token = localStorage.getItem('token');
    const payload =
    {
      avatar: this.cardImageBase64
    };
    this.settingpage.uploadavatar(payload, token).subscribe(res => {
      console.log(res, 'successfull added avatar');
    });
  }
  logout() {
    alert('aa')
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
