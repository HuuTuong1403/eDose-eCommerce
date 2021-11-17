import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BusinessService } from '../../service/business.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signinb',
  templateUrl: './signinb.component.html',
  styleUrls: ['./signinb.component.scss']
})
export class SigninbComponent implements OnInit {
  active = true;
  passwordVisible = false;
  signInForm: FormGroup;
  token: string = '';
  constructor(private titleService: Title,
              private businessService: BusinessService,
              private notify: NzNotificationService,
              private fb: FormBuilder,
              private cookieService: CookieService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.titleService.setTitle("Đăng nhập doanh nghiệp");
    this.signInForm = this.fb.group({
      inforSignIn: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
    this.active = false;
  }

  SignIn(): void{
    if(this.signInForm.valid){
      this.active = true;
      this.businessService.signIn(this.signInForm.value).subscribe(
        (response) => {
          this.token = response.data.token;
          this.businessService.getInforBusiness(response.data.token).subscribe(
            (res) => {
              this.active = false;
              if(res.tinhTrang === 'no authentication'){
                this.router.navigate(['/verify-email']);
              }
              else{
                this.cookieService.set('token_b', this.token);
                this.router.navigate(['/business/dashboard']);
                this.alertNotify('success', 'Đăng nhập thành công');
              }
            },
            (err) => {
              this.alertNotify('error', 'Thông tin tài khoản hoặc mật khẩu không chính xác')
            }
          )
      },
      (error) => {
        this.active = false;
        this.alertNotify('error', 'Thông tin tài khoản hoặc mật khẩu không chính xác')
      })
    }
    else{
      for(const i in this.signInForm.controls){
        this.signInForm.controls[i].markAsDirty();
        this.signInForm.controls[i].updateValueAndValidity();
      }
    }
  }

  alertNotify(type: string, content: string): void{
    if(type === 'success'){
      this.notify.create(
        type,
        'Thông báo',
        content,
        {
          nzStyle: {'background-color': '#DFFFD7'}
        }
      );
    }
    else{
      this.notify.create(
        type,
        'Thông báo',
        content,
        {
          nzStyle: {'background-color': '#FFCCCC'}
        }
      );
    }
  }
}
