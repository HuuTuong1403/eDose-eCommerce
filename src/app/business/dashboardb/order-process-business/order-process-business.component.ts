import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from 'src/app/service/business.service';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-process-business',
  templateUrl: './order-process-business.component.html',
  styleUrls: ['./order-process-business.component.scss']
})
export class OrderProcessBusinessComponent implements OnInit {
  active: boolean = true;
  formTinhTrang: FormGroup;
  isVisibleDetail = false;
  choose: string = '';
  collapse: boolean = true;
  ListOrders: any[] = [];
  singleValue: string = '';
  private token: string = '';

  constructor(private cookieService: CookieService,
              private businessService: BusinessService,
              private notify: NzNotificationService,
              private fb: FormBuilder,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Xử lý đơn hàng');
    this.token = this.cookieService.get('token_b');
    this.getListOrders();
    this.choose = 'Đã tiếp nhận';
    this.singleValue = 'Đã tiếp nhận';
  }

  listDaTiepNhan: any[] = [];
  listDangLayHang: any[] = [];
  listDaLayHang: any[] = [];
  listKhongLayDuocHang: any[] = [];
  listDangGiaoHang: any[] = [];
  listDaGiaoHang: any[] = [];
  listKhongGiaoDuocHang: any[] = [];
  listTraHang: any[] = [];
  listHoanTatDonHang: any[] = [];

  resetList(){
    this.listDaTiepNhan = [];
    this.listDangLayHang = [];
    this.listDaLayHang = [];
    this.listKhongLayDuocHang = [];
    this.listDangGiaoHang = [];
    this.listDaGiaoHang = [];
    this.listKhongGiaoDuocHang = [];
    this.listTraHang = [];
    this.listHoanTatDonHang = [];
  }

  getListOrders(){
    this.active = true;
    this.resetList();
    this.businessService.getListOrders(this.token).subscribe(
      (res) => {
        this.active = false;
        this.ListOrders = res.data;
        this.ListOrders.forEach(item => {
          switch(item.donHang.trangThai){
            case 'Đã tiếp nhận':
              this.listDaTiepNhan.push(item);
              break;
            case 'Đang lấy hàng':
              this.listDangLayHang.push(item);
              break;
            case 'Đã lấy hàng':
              this.listDaLayHang.push(item);
              break;
            case 'Không lấy được hàng':
              this.listKhongLayDuocHang.push(item);
              break;
            case 'Đang giao hàng':
              this.listDangGiaoHang.push(item);
              break;
            case 'Đã giao hàng':
              this.listDaGiaoHang.push(item);
              break;
            case 'Không giao được hàng':
              this.listKhongGiaoDuocHang.push(item);
              break;
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

  changeProcessOrder(IDBill: string, IDBillDetail: string, type: string){
    this.active = true;
    this.businessService.processOrder(this.token, IDBill, this.singleValue, IDBillDetail).subscribe(
      (res) => {
        this.active = false;
        this.isVisibleDetail = false;
        this.choose = this.singleValue;
        this.alertNotify('success', 'Đổi trạng thái đơn hàng thành công');
        this.getListOrders();
      },
      (err) => {
        this.active = false;
        this.singleValue = type;
        this.isVisibleDetail = false;
        this.alertNotify('error', 'Đổi trạng thái đơn hàng thất bại');
      }
    )
  }

  detailOrder: any;
  showDetail(item): void{
    this.detailOrder = item;
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
