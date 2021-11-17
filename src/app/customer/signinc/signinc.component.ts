import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomerService } from '../../service/customer.service';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signinc',
  templateUrl: './signinc.component.html',
  styleUrls: ['./signinc.component.scss']
})
export class SignincComponent implements OnInit {
  passwordVisible = false;
  password?: string;
  active = true;
  signInform: FormGroup;
  token: string = '';

  constructor(private titleService: Title,
              private customerService: CustomerService,
              private notify: NzNotificationService,
              private fb: FormBuilder,
              private router: Router,
              private cookieService: CookieService) {
  }
  ngOnInit(): void {
    this.titleService.setTitle("Đăng nhập khách hàng");
    this.signInform = this.fb.group({
      inforSignIn: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
    this.active = false;
  }

  SignIn(): void{
    if(this.signInform.valid){
      this.active = true;
      this.customerService.signIn(this.signInform.value).subscribe(
        (response) => {
          this.token = response.data.token;
          this.customerService.getUserDetail(this.token).subscribe(
            (res) => {
              this.active = false;
              if(res.tinhTrang === 'no authentication'){
                this.router.navigate(['/verify-email']);
              }
              else if(res.tinhTrang === 'Blocked'){
                this.router.navigate(['customer/user-block']);
              }
              else{
                this.cookieService.set('token_c', this.token);
                this.router.navigate(['/customer/dashboard']);
                this.notify.create(
                  'success',
                  'Thông báo',
                  'Đăng nhập thành công',
                  {
                    nzStyle: {'background-color': '#DFFFD7'}
                  }
                );
              }
            }
          )
        },
        (error) => {
          this.active = false;
          this.notify.create(
            'error',
            'Thông báo',
            'Thông tin tài khoản hoặc mật khẩu không chính xác',
            {
              nzStyle: {'background-color': '#FFCCCC'}
            }
          );
        })
      } else{
        for(const i in this.signInform.controls){
          this.signInform.controls[i].markAsDirty();
          this.signInform.controls[i].updateValueAndValidity();
        }
      }
  }

}
