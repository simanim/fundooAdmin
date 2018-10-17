import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
