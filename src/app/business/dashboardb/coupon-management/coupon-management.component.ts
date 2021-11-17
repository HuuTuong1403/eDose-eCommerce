import { Component, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from 'src/app/service/business.service';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { DialogBusinessComponent } from '../dialog-business/dialog-business.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.scss']
})
export class CouponManagementComponent implements OnInit {
  p: number = 1;
  choose: string = ''
  active: boolean = true;
  isVisibleDetail = false;
  nameKM = '';
  token: string = '';
  formAddKM: FormGroup;
  formUpdateKM: FormGroup;
  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  constructor(private cookieService: CookieService,
              private businessService: BusinessService,
              private notify: NzNotificationService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Quản lý khuyến mãi");
    this.token = this.cookieService.get('token_b');
    this.choose = 'default';
    this.active = false;
    this.createFormData();
    this.getAllPromotion();
  }

  listPromotion: any[] = [];
  getAllPromotion(){
    this.active = true;
    this.businessService.getPromotion(this.token).subscribe(
      (res) => {
        this.active = false;
        this.listPromotion = res;
      },
      (err) => {
        this.active = false;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  onClickAddPromotion(){
    this.choose = 'addKM';
    this.resetAddForm();
  }

  exit(){
    this.choose = 'default';
  }

  createFormData(){
    this.formAddKM = this.fb.group({
      ngayBD: ["", [Validators.required]],
      ngayKT: ["", [Validators.required]],
      maKM: ["", [Validators.required]],
      tenKM: ["", [Validators.required]],
      noiDung: ["", [Validators.required]],
      phanTram: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
    });
    this.formUpdateKM = this.fb.group({
      maKM: ["", [Validators.required]],
      ngayBD: ["", [Validators.required]],
      ngayKT: ["", [Validators.required]],
      tenKM: ["", [Validators.required]],
      noiDung: ["", [Validators.required]],
      phanTram: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
    })
  }

  promotion: any;
  showDetail(item: any): void{
    this.promotion = item;
    this.isVisibleDetail = true;
  }

  onClickUpdate(item: any){
    this.choose = 'updateKM';
    this.nameKM = item.tenKM;
    this.startValue = new Date(item.ngayBD);
    this.endValue = new Date(item.ngayKT);
    this.formUpdateKM.patchValue({
      maKM: item.maKM,
      ngayBD: this.startValue,
      ngayKT: this.endValue,
      tenKM:  item.tenKM,
      noiDung: item.noiDung,
      phanTram: item.phanTram,
    })
  }

  updatePromotion(id: any){
    if(this.formUpdateKM.valid){
      this.active = true;
      this.businessService.updatePromotion(this.formUpdateKM.value, this.token, id).subscribe(
        (res) => {
          this.active = false;
          this.getAllPromotion();
          this.isVisibleDetail = false;
          this.alertNotify('success', 'Chỉnh sửa khuyến mãi thành công');
        },
        (err) => {
          this.isVisibleDetail = true;
          this.active = false;
          if(err.error.message){
            this.alertNotify('error', err.error.message);
          }
          else{
            this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình chỉnh sửa khuyến mãi');
          }
        }
      )
    }
    else{
      for(const i in this.formUpdateKM.controls){
        this.formUpdateKM.controls[i].markAsDirty();
        this.formUpdateKM.controls[i].updateValueAndValidity();
      }
    }
  }

  openDialog(notify: string, isVisible: boolean, id: string){
    const dialogRef = this.dialog.open(DialogBusinessComponent, {
      width: '350px',
      height: '180px',
      data: {notify, isVisible, id},
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data.data == 'success'){
        this.alertNotify('success', 'Xóa khuyến mãi thành công');
        this.isVisibleDetail = false;
        this.getAllPromotion();
      }
      else{
        this.alertNotify('error', 'Xóa khuyến mãi không thành công');
        this.isVisibleDetail = true;
      }
    })
  }

  resetAddForm(){
    this.formAddKM.reset();
    this.startValue = null;
    this.nameKM = '';
    this.endValue = null;
  }

  addPromotion(){
    if(this.formAddKM.valid){
      this.active = true;
      this.businessService.addPromotion(this.formAddKM.value, this.token).subscribe(
        (res) => {
          this.active = false;
          this.alertNotify('success', 'Thêm khuyến mãi thành công');
          this.resetAddForm();
          this.getAllPromotion();
        },
        (err) => {
          this.active = false;
          this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình thêm khuyến mãi');
        }
      )
    }
    else{
      for(const i in this.formAddKM.controls){
        this.formAddKM.controls[i].markAsDirty();
        this.formAddKM.controls[i].updateValueAndValidity();
      }
    }
  }

  cancelDetail():void{
    this.isVisibleDetail = false;
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
