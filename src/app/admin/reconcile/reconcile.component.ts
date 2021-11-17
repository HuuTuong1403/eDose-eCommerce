import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../../service/admin.service';
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-reconcile',
  templateUrl: './reconcile.component.html',
  styleUrls: ['./reconcile.component.scss']
})
export class ReconcileComponent implements OnInit {

  token: string = '';
  loading: boolean = true;

  constructor(private adminService: AdminService,
              private notify: NzNotificationService,
              private cookieService: CookieService,
              private title: Title) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('token_a');
    this.title.setTitle('Hạch toán đối soát');
    this.getCompanies();
  }

  company: any[] = [];
  getCompanies(): void{
    this.loading = true;
    this.adminService.getListBusiness(this.token).subscribe(
      (res) => {
        this.company = res;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.alertNotify('error', 'Không thể lấy được dữ liệu');
      }
    )
  }

  alertNotify(type: string, content: string): void{
    if(type === 'success'){
      this.notify.create(
        type,
        'Thông báo',
        content,
        {
          nzStyle: {'background-color': '#DFFFD7'}
        }
      );
    }
    else{
      this.notify.create(
        type,
        'Thông báo',
        content,
        {
          nzStyle: {'background-color': '#FFCCCC'}
        }
      );
    }
  }

}
