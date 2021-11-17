import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service'
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboardc',
  templateUrl: './dashboardc.component.html',
  styleUrls: ['./dashboardc.component.scss']
})
export class DashboardcComponent implements OnInit {

  constructor(private title: Title,
              private router: Router,
              private customerService: CustomerService,
              private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.title.setTitle("Khách hàng");
  }

  isSelected(route: string): boolean{
    var router = '/customer/dashboard' + route;
    return router=== this.router.url;
  }

  logOut(): void {
    this.alertNotify('success', 'Bạn đã đăng xuất khỏi hệ thống');
    this.customerService.deleteToken();
    this.router.navigate(['/customer/signin']);
  }

  alertNotify(type: string, content: string): void{
    if(type === 'success')
    this.notify.create(
      type,
      'Thông báo',
      content,
      {
        nzStyle: {'background-color': '#DFFFD7'}
      }
    )
    else if(type === 'error'){
      this.notify.create(
        type,
        'Thông báo',
        content,
        {
          nzStyle: {'background-color': '#FFCCCC'}
        }
      )
    }
  }
}
