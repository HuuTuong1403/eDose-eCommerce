import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser'
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from '../../../service/business.service';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification'


@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {
  oldpasswordVisible = false;
  newpasswordVisible = false;
  rePasswordVisible = false;
  active = true;
  choose: string = '';
  formUpdate: FormGroup;
  formChangePass: FormGroup;
  token: string = '';

  constructor(private title: Title,
              private router: Router,
              private businessService: BusinessService,
              private cookieService: CookieService,
              private fb: FormBuilder,
              private notify: NzNotificationService,) { }

  ngOnInit(): void {
    this.title.setTitle('Thông tin chi tiết');
    this.active = false;
    this.token = this.cookieService.get('token_b');
    this.choose = 'default';
    this.createFormData();
    this.getInfor();
  }

  onBack(){
    this.choose = 'default'
    this.formChangePass.reset();
  }

  tenDN: string = '';
  onChangePass(){
    if(this.formChangePass.valid){
      this.active = true;
      this.tenDN = this.cookieService.get('bs_n');
      this.businessService.changePassBusiness(this.tenDN, this.formChangePass.value, this.token).subscribe(
        (res) => {
          this.choose = 'default';
          this.active = false;
          this.alertNotify('success', 'Đổi mật khẩu thành công');
          this.formChangePass.reset();
        },
        (err) => {
          this.active = false;
          this.alertNotify('error', err.error.message);
        }
      )
    }
    else{
      for(const i in this.formChangePass.controls){
        this.formChangePass.controls[i].markAsDirty();
        this.formChangePass.controls[i].updateValueAndValidity();
      }
    }
  }

  business: any;
  getInfor(){
    this.active = true;
    this.businessService.getInforBusiness(this.token).subscribe(
      (res) => {
        this.business = res;
        this.active = false;
      },
      (err) => {
        this.active = false;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá tình lấy dữ liệu');
      }
    )
  }

  updateBusiness(): void{
    if(this.formUpdate.valid){
      this.active = true;
      this.businessService.updateInforBusiness(this.formUpdate.value, this.token).subscribe(
        (res) => {
          this.active = false;
          this.choose = 'default';
          this.alertNotify('success', 'Chỉnh sửa thông tin thành công');
          this.getInfor();
        },
        (err) => {
          this.active = false;
          this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình chỉnh sửa');
        }
      )
    }
    else{
      for(const i in this.formUpdate.controls){
        this.formUpdate.controls[i].markAsDirty();
        this.formUpdate.controls[i].updateValueAndValidity();
      }
    }
  }

  clickToUpdate(){
    this.choose = 'updateInfor';
    this.formUpdate.patchValue({
      userName: this.business.userName,
      soDT: this.business.soDT,
      email: this.business.email,
    });
  }

  createFormData(){
    this.formUpdate = this.fb.group({
      userName: ["", Validators.required],
      soDT: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      email: ["", [Validators.required, Validators.email]],
    });
    this.formChangePass = this.fb.group({
      oldPassword: ["", Validators.compose([Validators.required,
                        Validators.minLength(8)])],
      newPassword: ["", Validators.compose([Validators.required,
                        Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]{8,32}$/),
                        Validators.minLength(8)])],
      newPasswordAgain: ["", [Validators.required, this.confirmationValidator]],
    });
  }

  logOut(): void {
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

  updateConfirmValidator(): void{
    Promise.resolve().then(() => this.formChangePass.controls.newPasswordAgain.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.formChangePass.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
