import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CustomerService } from './service/customer.service';
import { Router } from '@angular/router';
import { BusinessService } from './service/business.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private customerService: CustomerService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.customerService.isLoggedIn()){
        this.router.navigateByUrl('/customer/signin');
        this.customerService.deleteToken();
        return false;
      }
    return true;
  }

}
