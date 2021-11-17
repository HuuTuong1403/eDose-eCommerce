import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private title: Title,
              private router: Router,
              private adminService: AdminService,
              private notify: NzNotificationService) {
  }

  ngOnInit(): void {
    this.title.setTitle("Quản trị");
  }

  isSelected(route: string): boolean{
    var router = '/admin/dashboard' + route;
    return router=== this.router.url;
  }

  logOut(): void {
    this.alertNotify('success', 'Bạn đã đăng xuất khỏi hệ thống');
    this.adminService.deleteToken();
    this.router.navigate(['/admin/signin']);
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
