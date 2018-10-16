import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes } from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
const routes: Routes = [
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: '', redirectTo:"adminLogin", pathMatch: "full"}
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
