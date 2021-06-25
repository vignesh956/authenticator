import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
// import {AuthenticationGuard } from '../app/guards/authentication.guard'; 

const routes: Routes = [

  // {path: 'dashboard' , component: DashbordComponent  , canActivate : [AuthenticationGuard] },
  {path: 'dashboard' , component: DashbordComponent  },
  {path: 'home' , component: HomeComponent},
  {path: 'report' , component: ReportsComponent},
  {path: 'setting' , component: SettingsComponent},
  {path: 'menu' , component: MenuComponent},
  {path: 'create-document' , component: CreateDocumentComponent},
  // {path: '' ,  redirectTo:'signup', pathMatch: 'full'},
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
