import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import {  AuthGuard} from "./component/guard/auth.guard";
import { AnswerApprovalComponent } from './component/answer-approval/answer-approval.component';

const routes: Routes = [
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate:[AuthGuard]},
  { path: 'approval', component: AnswerApprovalComponent },
  { path: '', redirectTo:"adminLogin", pathMatch: "full" }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
