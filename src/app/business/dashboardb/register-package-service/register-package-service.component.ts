import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from 'src/app/service/business.service';
import { DialogBusinessComponent } from '../dialog-business/dialog-business.component';
import { Title } from '@angular/platform-browser';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register-package-service',
  templateUrl: './register-package-service.component.html',
  styleUrls: ['./register-package-service.component.scss']
})
export class RegisterPackageServiceComponent implements OnInit {
  active = true;
  steps: number;
  packageService: any[] = [];
  tenDN: string;
  inforDN: any;
  token: string;
  packageIsRegister: any;
  choosePayment: FormGroup;

  constructor(private businessService: BusinessService,
              public dialog: MatDialog,
              private cookieService: CookieService,
              private notify: NzNotificationService,
              private title: Title,
              private fb: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.title.setTitle('Đăng ký gói dịch vụ');
    this.token = this.cookieService.get("token_b");
    this.choosePayment = this.fb.group({
      payment: ["", Validators.required],
    });
    this.getPackageIsRegiter();
    this.getPackageService();
    this.getInforBusiness();
  }

  flaqCancel = 0;
  transformDate(date){
    return this.datePipe.transform(date, 'dd/MM/yyyy vào lúc HH:mm:ss');
  }

  getPackageIsRegiter(){
    this.active = true;
    this.businessService.getPackageIsRegister(this.token).subscribe(
      (res) => {
        res.data.goiDichVu.forEach(item => {
          if(item.trangThai !== 'cancel'){
            this.packageIsRegister = item;
            let EndDate = Date.parse(this.packageIsRegister.ngayHetHan);
            let DateNow = new Date();
            let tru = EndDate - DateNow.getTime();
            if(tru <= (1000 * 3600 * 24) && tru > 0){
              this.alertNotify('error', 'Gói dịch vụ của bạn sắp hết hạn vào ngày ' + this.transformDate(EndDate) + '! Vui lòng gia hạn thêm gói dịch vụ để sử dụng');
            }
            else if(tru < 0){
              this.alertNotify('error', 'Gói dịch vụ của bạn đã hết hạn sử dụng và sẽ tự hủy sau 2 giây');
              setTimeout(() => {
                this.businessService.cancelPackageIsRegister(this.token).subscribe(
                  (res) => {
                    this.alertNotify('success', 'Gói dịch vụ của bạn đã tự động hủy vui lòng đăng ký gói dịch vụ mới');
                    this.steps = 1;
                  },
                  (err) => {
                    this.alertNotify('success', 'Hủy gói dịch vụ thất bại');
                  }
                )
              }, 2000);
            }
          }
        });
        if(this.packageIsRegister === undefined){
          this.steps = 1;
        }
        else{
          this.steps = 0;
        }
        this.active = false;
      },
      (err) => {
        this.active = true;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  getPackageService(): void{
    this.active = true;
    this.businessService.getPackageService().subscribe(
      (res) => {
        this.packageService = res;
        this.active = false;
      },
      (err) => {
        this.active = false;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  getInforBusiness(){
    this.active = true;
    this.businessService.getInforBusiness(this.token).subscribe(
      (res) => {
        this.active = false;
        this.inforDN = res;
      },
      (err) => {
        this.active = true;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  payPackageService(maGoiDV: string, tenGoiDV: string, cuocPhi: string, type: string){
    if(type === 'payment'){
      if(this.choosePayment.valid){
        this.active = true;
        let choose = this.choosePayment.controls['payment'].value;
        if(choose === 'PayPal'){
          this.businessService.paymentPackageService(this.token, maGoiDV, tenGoiDV, cuocPhi).subscribe(
            (res) => {
              this.steps = 1;
              this.alertNotify('success', 'Đơn hàng đang trong quá trình thanh toán');
              var w = window.open(res.url, '_blank', 'location = yes, height = 570, width = 520, scrollbars = yes, status = yes');
              var s = setInterval(() => {
                if(w.closed){
                  this.active = false;
                  clearInterval(s);
                  this.choosePayment.reset();
                  this.getPackageIsRegiter();
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
          this.businessService.createPaymentVNPay(this.token, maGoiDV, tenGoiDV, cuocPhi).subscribe(
            (res) => {
              this.steps = 1;
              this.alertNotify('success', 'Đơn hàng đang trong quá trình thanh toán');
              var w = window.open(res.data, '_blank', 'location = yes, height = 570, width = 520, scrollbars = yes, status = yes');
              var s = setInterval(() => {
                if(w.closed){
                  this.active = false;
                  clearInterval(s);
                  this.choosePayment.reset();
                  this.getPackageIsRegiter();
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
    else{
      if(this.choosePayment.valid){
        this.active = true;
        let choose = this.choosePayment.controls['payment'].value;
        if(choose === 'PayPal'){
          this.businessService.paymentPackageService(this.token, maGoiDV, tenGoiDV, cuocPhi).subscribe(
            (res) => {
              this.alertNotify('success', 'Đơn hàng đang trong quá trình thanh toán');
              var w = window.open(res.url, '_blank', 'location = yes, height = 570, width = 520, scrollbars = yes, status = yes');
              var s = setInterval(() => {
                if(w.closed){
                  clearInterval(s);
                  this.active = false;
                  this.choosePayment.reset();
                  this.isVisibleChoosePayment = false;
                  this.getPackageIsRegiter();
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
          this.businessService.createPaymentVNPay(this.token, maGoiDV, tenGoiDV, cuocPhi).subscribe(
            (res) => {
              this.alertNotify('success', 'Đơn hàng đang trong quá trình thanh toán');
              var w = window.open(res.data, '_blank', 'location = yes, height = 570, width = 520, scrollbars = yes, status = yes');
              var s = setInterval(() => {
                if(w.closed){
                  this.active = false;
                  clearInterval(s);
                  this.choosePayment.reset();
                  this.isVisibleChoosePayment = false;
                  this.getPackageIsRegiter();
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
  }

  backStep(){
    this.steps = 1;
  }

  isVisibleDetail = false;
  detailPackage: any;
  showDetail(item: any): void{
    this.detailPackage = item;
    this.isVisibleDetail = true;
  }
  cancelDetail():void{
    this.isVisibleDetail = false;
  }

  onClickPayment(){
    this.cancelDetail();
    this.showChoosePayment();
  }

  isVisibleChoosePayment = false;
  showChoosePayment(): void{
    this.isVisibleChoosePayment = true;
  }
  cancelChoosePayment():void{
    this.isVisibleChoosePayment = false;
  }

  openDialog(notify: string, isVisible: boolean, id: string){
      const dialogRef = this.dialog.open(DialogBusinessComponent, {
        width: '350px',
        height: '180px',
        data: {notify, isVisible, id},
      });


      dialogRef.afterClosed().subscribe(data => {
        if(data.type === 'success'){
          this.steps = 2;
          this.isVisibleDetail = false;
          this.alertNotify('success', 'Đăng ký gói dịch vụ thành công');
        }
        else if(data.type === 'error'){
          this.isVisibleDetail = false;
          this.alertNotify('error', 'Bạn đã đăng ký gói dịch vụ khác vui lòng hủy trước khi đăng ký gói dịch vụ mới');
        }
        else if(data.type === 'cancel'){
          this.alertNotify('success', 'Hủy gói dịch vụ thành công');
          this.steps = 1;
          this.flaqCancel = 1;
        }
        else{
          this.isVisibleDetail = false;
        }
      })
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
