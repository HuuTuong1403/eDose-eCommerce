import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reconcile-detail',
  templateUrl: './reconcile-detail.component.html',
  styleUrls: ['./reconcile-detail.component.scss']
})
export class ReconcileDetailComponent implements OnInit {
  company: any;
  dateFormat = 'yyyy/MM/dd';
  id: string = '';
  token: string = '';
  active: boolean = true;
  startValue: Date | null = null;
  endValue: Date | null = null;
  formDate: FormGroup;
  hasData: boolean = false;
  loading: boolean = true;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private location: Location,
              private cookieService: CookieService,
              private title: Title,
              private notify: NzNotificationService,
              private fb: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.title.setTitle('Hạch toán đối soát');
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.cookieService.get('token_a');
    this.getCompanyDetail();
    this.formDate = this.fb.group({
      ngayBD: ["", [Validators.required]],
      ngayKT: ["", [Validators.required]],
    });
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
      this.adminService.acceptReconciliation(this.token,   this.id, this.detailCompany.tenDN, this.startValue.toISOString(), this.endValue.toISOString()).subscribe(
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
      this.adminService.getReconciling(this.token, this.id, this.detailCompany.tenDN, this.startValue.toISOString(), this.endValue.toISOString()).subscribe(
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

  transformDate(date){
    return this.datePipe.transform(date, 'dd/MM/yyyy');
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

  detailCompany: any;
  getCompanyDetail(): void{
    this.adminService.showBusinessDetail(this.token, this.id).subscribe(
      (res) => {
        this.detailCompany = res;
        this.active = false;
        this.loading = false;
      },
      (err) => {
        this.active = true;
        this.loading = true;
        this.alertNotify('error', 'Không thể lấy dữ liệu');
      }
    )
  }

  goBack(): void{
    this.location.back();
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
