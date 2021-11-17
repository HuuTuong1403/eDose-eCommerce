import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomerService } from '../service/customer.service'
import { Router } from '@angular/router'
import { BusinessService } from '../service/business.service';

@Component({
  selector: 'app-payment-denied',
  templateUrl: './payment-denied.component.html',
  styleUrls: ['./payment-denied.component.scss']
})
export class PaymentDeniedComponent implements OnInit {

  constructor(private title: Title,
              private customerService: CustomerService,
              private businessService: BusinessService,
              private router: Router) { }

  ngOnInit(): void {
    this.title.setTitle('Thanh toán thất bại');
  }

  returnRole(){
    if(this.customerService.isLoggedIn()){
      this.router.navigate(['/customer/dashboard']);
    }
    else if(this.businessService.isLoggedIn()){
      this.router.navigate(['/business/dashboard']);
    }
    else{
      this.router.navigate(['/choose-role']);
    }
  }

}
