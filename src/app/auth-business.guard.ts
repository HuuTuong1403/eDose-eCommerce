import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BusinessService } from './service/business.service';

@Injectable({
  providedIn: 'root'
})
export class AuthBusinessGuard implements CanActivate {
  constructor(private businessService: BusinessService,
              private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.businessService.isLoggedIn()){
        this.router.navigateByUrl('/business/signin');
        this.businessService.deleteToken();
        return false;
      }
    return true;
  }

}
