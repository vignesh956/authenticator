import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './manage-section/inbox/inbox.component';
import { MenuComponent } from './menu/menu.component';
import { ReportsComponent } from './reports/reports.component';
import { ChangePasswordComponent } from './settings-info/change-password/change-password.component';
import { SettingsComponent } from './settings/settings.component';
import {AuthenticationGuard } from '../app/guards/authentication.guard'; 
import { Sidebar } from 'ng-sidebar';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [

  {path: 'dashboard' , component: DashbordComponent  , canActivate : [AuthenticationGuard] },
  {path: 'side' , component: SidebarComponent},
  // {path: 'dashboard' , component: DashbordComponent  },
  {path: 'home' , component: HomeComponent},
  {path: 'report' , component: ReportsComponent},
  {path: 'setting' , component: SettingsComponent},
  {path: 'menu' , component: MenuComponent},
  {path: 'create-document' , component: CreateDocumentComponent},
  {path: 'change' , component: ChangePasswordComponent},
 
  {path: '' ,  redirectTo:'signup', pathMatch: 'full'},
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
