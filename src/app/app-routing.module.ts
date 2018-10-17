import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent },
  { path: '', redirectTo:"adminLogin", pathMatch: "full"}
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
