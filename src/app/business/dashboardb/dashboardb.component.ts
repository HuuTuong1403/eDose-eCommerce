import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from '../../service/business.service';

@Component({
  selector: 'app-dashboardb',
  templateUrl: './dashboardb.component.html',
  styleUrls: ['./dashboardb.component.scss']
})
export class DashboardbComponent implements OnInit {
  token: string = '';
  constructor(private title: Title,
    private router: Router,
    private businessService: BusinessService,
    private cookieService: CookieService,
    private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.title.setTitle("Doanh Nghiệp");
    this.token = this.cookieService.get('token_b');
    this.approvalBusiness();
  }

  doanhNghiep: any;
  approvalBusiness(){
    this.businessService.getInforBusiness(this.token).subscribe(
      (res) => {
        this.doanhNghiep = res;
        if(res.tinhTrang === 'waitingforapproval' || res.tinhTrang === 'authentication' || res.tinhTrang === 'DeniedApproval'){
          this.router.navigate(['/business/dashboard/approval'])
        }
        else{
          this.router.navigate(['/business/dashboard/register-package-service'])
        }
      },
      (err) => {
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  isSelected(route: string): boolean{
    var router = '/business/dashboard' + route;
    return router=== this.router.url;
  }

  logOut(): void {
    this.alertNotify('success', 'Bạn đã đăng xuất khỏi hệ thống');
    this.businessService.deleteToken();
    this.router.navigate(['/business/signin']);
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
