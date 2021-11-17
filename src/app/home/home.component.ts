import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service'
import { Router } from '@angular/router'
import { BusinessService } from '../service/business.service';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private customerService: CustomerService,
              private businessService: BusinessService,
              private adminService: AdminService,
              private router: Router,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Trang chủ');
  }

  SignIn(): void{
    if(this.customerService.isLoggedIn()){
      this.router.navigate(['/customer/dashboard']);
    }
    else if(this.businessService.isLoggedIn()){
      this.router.navigate(['/business/dashboard']);
    }
    else if(this.adminService.isLoggedIn()){
      this.router.navigate(['/admin/dashboard']);
    }
    else{
      this.router.navigate(['/choose-role']);
    }
  }

  onClickBlog(){
    window.open('https://blog-contentmarketing.web.app/', '_blank');
  }
}
