import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from '../../../service/business.service';

@Component({
  selector: 'app-price-declaration-business',
  templateUrl: './price-declaration-business.component.html',
  styleUrls: ['./price-declaration-business.component.scss']
})
export class PriceDeclarationBusinessComponent implements OnInit {

  category = "";
  active = true;
  token: string;
  formDeclareKm: FormGroup;
  formDeclareKg: FormGroup;
  loaiHangHoa: any[] = [];

  constructor(private businessService: BusinessService,
              private fb: FormBuilder,
              private notify: NzNotificationService,
              private cookieService: CookieService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Cung cấp đơn giá');
    this.token = this.cookieService.get('token_b');
    this.category = "km";
    this.createFormGroup();
    this.getDistrict();
    this.getLoaiHangHoa();
  }

  getLoaiHangHoa(){
    this.active = true;
    this.businessService.getListLoaiHangHoa(this.token).subscribe(
      (res) => {
        this.active = false;
        this.loaiHangHoa = res;
      },
      (err) => {
        this.active = false;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  district: any[] = [];
  getDistrict(){
    this.active = true;
    this.businessService.getDistrictInHoChiMinhGHN().subscribe(
      (res) => {
        this.active = false;
        this.district = res.data;
      },
      (err) => {
        this.active = false;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  createFormGroup(){
    this.formDeclareKm = this.fb.group({
      loaiHangHoa: ["", [Validators.required]],
      donGiaKmDau: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      soKmDau: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      donGiaKmTt: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      soKmTt: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      soKmMax: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      khuVuc: ["", [Validators.required]]
    });
    this.formDeclareKg = this.fb.group({
      loaiHangHoa: ["", [Validators.required]],
      dongiaKgDau: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      soKgDau: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      donGiaKgTt: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      soKgTt: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      soKgMax: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      khuVuc: ["", [Validators.required]]
    })
  }

  priceDeclareKG(): void{
    if(this.formDeclareKg.valid){
      this.active = true;
      this.businessService.priceDeClareKM(this.formDeclareKg.value, this.token).subscribe(
        (res) => {
          this.active = false;
          this.formDeclareKg.reset();
          this.alertNotify('success', 'Cung cấp đơn giá theo kilograms thành công');
        },
        (err) => {
          this.active = false;
          this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình cung cấp');
        }
      )
    }
    else{
      for(const i in this.formDeclareKg.controls){
        this.formDeclareKg.controls[i].markAsDirty();
        this.formDeclareKg.controls[i].updateValueAndValidity();
      }
    }
  }

  priceDeclareKM(): void{
    if(this.formDeclareKm.valid){
      this.active = true;
      this.businessService.priceDeClareKM(this.formDeclareKm.value, this.token).subscribe(
        (res) => {
          this.active = false;
          this.formDeclareKm.reset();
          this.alertNotify('success', 'Cung cấp đơn giá theo kilometers thành công');
        },
        (err) => {
          this.active = false;
          this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình cung cấp');
        }
      )
    }
    else{
      for(const i in this.formDeclareKm.controls){
        this.formDeclareKm.controls[i].markAsDirty();
        this.formDeclareKm.controls[i].updateValueAndValidity();
      }
    }
  }

  clickChangeCategory(category: string): void{
    this.category = category;
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
