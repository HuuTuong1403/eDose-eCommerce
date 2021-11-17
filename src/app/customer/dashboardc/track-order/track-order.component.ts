import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
  pChuaTiepNhan: number = 1;
  pDaTiepNhan: number = 1;
  pDangLayHang: number = 1;
  pDaLayHang: number = 1;
  pKhongLayDuocHang: number = 1;
  pDangGiaoHang: number = 1;
  pDaGiaoHang: number = 1;
  pKhongGiaoDuocHang: number = 1;
  pTraHang: number = 1;
  pHoanTatDonHang: number = 1;
  collapse: boolean = true;
  active: boolean = true;
  singleValue: string = '';
  choose: string = '';
  token: string = '';
  choosePayment: FormGroup;
  constructor(private title: Title,
              private cookieService: CookieService,
              private customerService: CustomerService,
              private notify: NzNotificationService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.title.setTitle('Theo dõi đơn hàng');
    this.token = this.cookieService.get('token_c');
    this.choose = 'Chưa tiếp nhận';
    this.singleValue = 'Chưa tiếp nhận';
    this.getListOrders();
    this.choosePayment = this.fb.group({
      payment: ["", Validators.required],
    });
  }

  listChuaTiepNhan: any[] = [];
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
    this.listChuaTiepNhan = [];
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
            case 'unpaid':
              this.listChuaTiepNhan.push(item);
              break;
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

  createPayment(IDBill: string, IDBillDetail: string, tenHangHoa: string, totalCost: string){
    if(this.choosePayment.valid){
      this.active = true;
      let choose = this.choosePayment.controls['payment'].value;
      if(choose === 'PayPal'){
        this.customerService.createPaymentOrders(this.token, IDBill, IDBillDetail, tenHangHoa, totalCost).subscribe(
          (res) => {
            this.active = false;
            this.alertNotify('success', 'Đơn hàng đang trong quá trình thanh toán');
            this.isVisibleDetail = false;
            this.isVisibleChoosePayment = false;
            var w = window.open(res.url, '_blank', 'location = yes, height = 570, width = 520, scrollbars = yes, status = yes');
            var s = setInterval(() => {
              if(w.closed){
                clearInterval(s);
                this.choosePayment.reset();
                this.getListOrders();
              }
            }, 500)
          },
          (err) => {
            this.active = false;
            this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình thanh toán');
          }
        )
      }
      else{
        this.customerService.createPaymentVNPay(this.token, IDBill, IDBillDetail, tenHangHoa, totalCost).subscribe(
          (res) => {
            this.active = false;
            this.isVisibleDetail = false;
            this.isVisibleChoosePayment = false;
            this.alertNotify('success', 'Đơn hàng đang trong quá trình thanh toán');
            var w = window.open(res.data, '_blank', 'location = yes, height = 570, width = 520, scrollbars = yes, status = yes');
            var s = setInterval(() => {
              if(w.closed){
                this.active = false;
                clearInterval(s);
                this.choosePayment.reset();
                this.getListOrders();
              }
            }, 500)
          },
          (err) => {
            this.active = false;
            this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình thanh toán');
          }
        )
      }
    }
    else{
      for(const i in this.choosePayment.controls){
        this.choosePayment.controls[i].markAsDirty();
        this.choosePayment.controls[i].updateValueAndValidity();
      }
    }
  }

  cancelOrders(id: string){
    this.active = true;
    this.customerService.cancelOrder(this.token, id).subscribe(
      (res) => {
        this.active = false;
        this.isVisibleDetail = false;
        this.getListOrders();
        this.alertNotify('success', 'Hủy đơn hàng thành công');
      },
      (err) => {
        this.active = false;
        this.isVisibleDetail = true;
        this.alertNotify('error', 'Hủy đơn hàng không thành công');
      }
    )
  }

  isVisibleChoosePayment = false;
  showChoosePayment(): void{
    this.isVisibleChoosePayment = true;
  }
  cancelChoosePayment():void{
    this.isVisibleChoosePayment = false;
    this.showDetail(this.orderDetail);
  }

  onClickPayment(){
    this.cancelDetail();
    this.showChoosePayment();
  }

  clickToChange(type: string){
    this.choose = type;
    this.singleValue = type;
    this.collapse = true;
  }

  onClickedOutside(e: Event) {
    this.collapse = true;
  }

  isVisibleDetail = false;
  orderDetail: any;
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
