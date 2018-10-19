import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate() {
    if (localStorage.getItem('fundooId')) {
      // window.location.href="/adminDashboard";
        return true;
    }
    window.location.href="/adminLogin";
    return false;

  }
}
