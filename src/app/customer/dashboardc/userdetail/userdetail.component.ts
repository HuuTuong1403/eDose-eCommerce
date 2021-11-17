import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomerService } from '../../../service/customer.service';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
  updateInforUser: FormGroup;
  changePassUserForm: FormGroup;
  update: number;
  user?: any;
  active = true;
  oldpasswordVisible = false;
  newpasswordVisible = false;
  rePasswordVisible = false;
  token: string;

  constructor(private customerService: CustomerService,
              private title: Title,
              private router: Router,
              private fb: FormBuilder,
              private notify: NzNotificationService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.title.setTitle("Quản lý tài khoản");
    this.token = this.cookieService.get("token_c");
    this.showUser();
    this.update = 0;
    this.updateInforUser = this.fb.group({
      tenDangNhap: ["", [Validators.required]],
      soDienThoai: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      hoVaTen: ["", [Validators.required]],
      ngaySinh: ["", [Validators.required]],
      diaChi: ["", [Validators.required]],
    });
    this.changePassUserForm = this.fb.group({
      oldPassword: ["", Validators.compose([Validators.required,

                        Validators.minLength(8)])],
      newPassword: ["", Validators.compose([Validators.required,
                        Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]{8,32}$/),
                        Validators.minLength(8)])],
      newPasswordAgain: ["", [Validators.required, this.confirmationValidator]],
    });
  }

  onChangePass(): void{
    if(this.changePassUserForm.valid){
      this.active = true;
      this.customerService.changePass(this.changePassUserForm.value, this.token).subscribe(
        (res) => {
          this.alertNotify('success', 'Đổi mật khẩu thành công');
          this.changePassUserForm.reset();
          this.active = false;
        },
        (err) => {
          this.alertNotify('error', err.error.message);
          this.active = false;
        }
      )
    }
    else{
      for(const i in this.changePassUserForm.controls){
        this.changePassUserForm.controls[i].markAsDirty();
        this.changePassUserForm.controls[i].updateValueAndValidity();
      }
    }
  }

  return(): void{
    this.update = 0;
    this.ngOnInit();
  }

  clickChangePass(): void{
    this.update = 2;
    this.active = false;
  }

  clickUpdate(): void{
    this.update = 1;
    this.updateInforUser.patchValue({
      tenDangNhap: this.user.tenDangNhap,
      soDienThoai: this.user.soDienThoai,
      email: this.user.email,
      hoVaTen: this.user.hoVaTen,
      ngaySinh: this.user.ngaySinh,
      diaChi: this.user.diaChi,
    })
  }

  updateConfirmValidator(): void{
    Promise.resolve().then(() => this.changePassUserForm.controls.newPasswordAgain.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changePassUserForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  onUpdateInfo(): void{
    if(this.updateInforUser.valid){
      this.active = true;
      this.customerService.updateUserDetails(this.updateInforUser.value, this.token).subscribe(
        (response) => {
          this.showUser();
          this.alertNotify('success', 'Chỉnh sửa thông tin thành công');
          this.active = false;
          this.update = 0;
        },
        (error) => {
          this.active = false;
          this.alertNotify('error', 'Đãy xảy ra lỗi trong quá trình chỉnh sửa');
        }
      )
    }
    else{
      for(const i in this.updateInforUser.controls){
        this.updateInforUser.controls[i].markAsDirty();
        this.updateInforUser.controls[i].updateValueAndValidity();
      }
    }
  }

  logOut(): void {
    this.alertNotify('success', 'Bạn đã đăng xuất khỏi hệ thống');
    this.customerService.deleteToken();
    this.router.navigate(['/customer/signin']);
  }

  showUser(): void{
    this.customerService.getUserDetail(this.token).subscribe(
      (response) => {
        this.user = response;
        this.active = false;
      },
      (error) => {
        this.active = false;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
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
