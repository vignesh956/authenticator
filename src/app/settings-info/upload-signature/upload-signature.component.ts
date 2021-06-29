import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/snackbar.service';
import { SettingPagesService } from '../setting-pages.service';

@Component({
  selector: 'app-upload-signature',
  templateUrl: './upload-signature.component.html',
  styleUrls: ['./upload-signature.component.scss']
})
export class UploadSignatureComponent implements OnInit {

  selectedFile: any
  imageError: any;
  isImageSaved: boolean = false;
  cardImageBase64: any;


  constructor(
    private settingService: SettingPagesService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
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
        this.isImageSaved = true;
        // this.previewImagePath = imgBase64Path;

      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onupload() {
    alert('aa')
    const token = localStorage.getItem('token');
    const payload =
    {
      signature: this.cardImageBase64
    };
    this.settingService.uploadsignature(payload, token).subscribe((resp: any) => {
      if (resp.status === 201) {
        console.log(resp);
        this.snackbarService.openSnackBar('successfull added signature !!');
      }
      if (resp.status === 500) {
        this.snackbarService.openSnackBar('unable to verify token');
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

}
