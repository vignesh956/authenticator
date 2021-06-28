import { Component, OnInit } from '@angular/core';
import { SettingPagesService } from '../setting-pages.service';
@Component({
  selector: 'app-upload-stamp',
  templateUrl: './upload-stamp.component.html',
  styleUrls: ['./upload-stamp.component.scss']
})
export class UploadStampComponent implements OnInit {
  selectedFile: any
  imageError: any;
  isImageSaved: boolean = false;
  cardImageBase64: any;


  constructor(private settingService: SettingPagesService) { }

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
    const payload = {
      avatar: this.cardImageBase64
    };
    this.settingService.addimg(payload).subscribe(add => {
      console.log(add, 'successfull added');
    });
  }

}
