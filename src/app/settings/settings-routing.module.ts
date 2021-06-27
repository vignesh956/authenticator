import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../settings-info/change-password/change-password.component';
import { ProfileComponent } from '../settings-info/profile/profile.component';
import { UploadSignatureComponent } from '../settings-info/upload-signature/upload-signature.component';
import { UploadStampComponent } from '../settings-info/upload-stamp/upload-stamp.component';

const routes: Routes = [
  {path: 'profile' , component: ProfileComponent  },
  {path: 'change-password' , component: ChangePasswordComponent  },
  {path: 'upload-signature' , component: UploadSignatureComponent  },
  {path: 'upload-stamp' , component: UploadStampComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
