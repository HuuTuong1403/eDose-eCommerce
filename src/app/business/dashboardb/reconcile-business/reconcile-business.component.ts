import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from '../../../service/business.service'
import { Title } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reconcile-business',
  templateUrl: './reconcile-business.component.html',
  styleUrls: ['./reconcile-business.component.scss']
})
export class ReconcileBusinessComponent implements OnInit {
  dateFormat = 'yyyy/MM/dd';
  nameBusiness: string = '';
  token: string = '';
  business: any;
  active: boolean = true;
  startValue: Date | null = null;
  endValue: Date | null = null;
  formDate: FormGroup;
  hasData: boolean = false;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  constructor(private cookieService: CookieService,
              private businessService: BusinessService,
              private title: Title,
              private notify: NzNotificationService,
              private fb: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.title.setTitle('Hạch toán đối soát');
    this.token = this.cookieService.get("token_b");
    this.getInforBusiness();
    this.formDate = this.fb.group({
      ngayBD: ["", [Validators.required]],
      ngayKT: ["", [Validators.required]],
    });
  }

  transformDate(date){
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  checkBackReconciliation(){
    if(this.businessReconciling.tongHoaDon == 0){
      this.alertNotify('error', 'Không có đơn hàng từ ngày ' + this.transformDate(this.startValue) + ' đến ngày ' + this.transformDate(this.endValue) + ' để đối soát')
    }
    else{
      if(this.businessReconciling.tongHoaDon === this.businessEDose.tongHoaDon){
        this.alertNotify('error', 'Số đơn hàng 2 doanh nghiệp ghi nhận bằng nhau không thể yêu cầu đối soát lại')
      }
      else{
        this.alertNotify('success', 'Đã gửi yêu cầu đối soát lại tới doanh nghiệp eDose DeliveryHub')
        this.startValue = null;
        this.endValue = null;
        this.hasData = false;
        this.active = false;
        this.formDate.reset();
      }
    }
  }

  acceptReconciliation(){
    if(this.businessReconciling.tongHoaDon == 0){
      this.alertNotify('error', 'Không có đơn hàng từ ngày ' + this.transformDate(this.startValue) + ' đến ngày ' + this.transformDate(this.endValue) + ' để đối soát')
    }
    else{
      this.active = true;
      this.businessService.acceptReconciliation(this.token, this.business.tenDN, this.startValue.toISOString(), this.endValue.toISOString()).subscribe(
        (res) => {
          this.alertNotify('success', 'Hạch toán/Đối soát thành công');
          this.startValue = null;
          this.endValue = null;
          this.hasData = false;
          this.active = false;
          this.formDate.reset();
        },
        (err) => {
          this.active = false;
          this.alertNotify('error', 'Hạch toán/Đối soát thất bại');
        }
      );
    }

  }

  businessReconciling: any;
  businessEDose: any;
  onClickAccept(){
    if(this.formDate.valid){
      this.active = true;
      this.businessService.getReconciling(this.token, this.business.tenDN, this.startValue.toISOString(), this.endValue.toISOString()).subscribe(
        (res) => {
          this.active = false;
          this.hasData = true;
          this.businessReconciling = res.data.bussinessName;
          this.businessEDose = res.data.eDoseDiveryHub;
        },
        (err) => {
          this.active = false;
          this.alertNotify('error', 'Không thể lấy được dữ liệu');
        }
      )
    }
    else{
      for(const i in this.formDate.controls){
        this.formDate.controls[i].markAsDirty();
        this.formDate.controls[i].updateValueAndValidity();
      }
    }
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {
  }


  getInforBusiness(){
    this.businessService.getInforBusiness(this.token).subscribe(
      (res) => {
        this.business = res;
        this.active = false;
      },
      (err) => {
        this.active = true;
        this.alertNotify('error', 'Không tải được dữ liệu');
      }
    )
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
