import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { CustomerService } from '../../../service/customer.service';
import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-delivery-management',
  templateUrl: './delivery-management.component.html',
  styleUrls: ['./delivery-management.component.scss']
})
export class DeliveryManagementComponent implements OnInit {
  pHoanTatDonHang: number = 1;
  pTraHang: number = 1;
  collapse: boolean = true;
  active: boolean = true;
  singleValue: string = '';
  choose: string = '';
  token: string = '';

  constructor(private title: Title,
              private cookieService: CookieService,
              private customerService: CustomerService,
              private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.title.setTitle('Quản lý lịch sử giao hàng');
    this.token = this.cookieService.get('token_c');
    this.choose = 'Hoàn tất đơn hàng';
    this.singleValue = 'Hoàn tất đơn hàng';
    this.getListOrders();
  }

  listTraHang: any[] = [];
  listHoanTatDonHang: any[] = [];
  resetList(){
    this.listTraHang = [];
    this.listHoanTatDonHang = [];
  }

  ListOrders: any[] = [];
  getListOrders(){
    this.active = true;
    this.resetList();
    this.customerService.getListOrder(this.token).subscribe(
      (res) => {
        this.active = false;
        this.ListOrders = res.data;
        this.ListOrders.forEach(item => {
          switch(item.donHang.trangThai){
            case 'Trả hàng':
              this.listTraHang.push(item);
              break;
            case 'Hoàn tất đơn hàng':
              this.listHoanTatDonHang.push(item);
              break;
          }
        })
      },
      (err) => {
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  clickToChange(type: string){
    this.choose = type;
    this.singleValue = type;
    this.collapse = true;
  }

  onClickedOutside(e: Event) {
    this.collapse = true;
  }

  orderDetail: any;
  isVisibleDetail = false;
  showDetail(item: any): void{
    this.orderDetail = item;
    this.isVisibleDetail = true;
  }
  cancelDetail():void{
    this.isVisibleDetail = false;
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
