import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signina',
  templateUrl: './signina.component.html',
  styleUrls: ['./signina.component.scss']
})
export class SigninaComponent implements OnInit {
  active = true;
  passwordVisible = false;
  signInForm: FormGroup;
  token: string = '';

  constructor(private titleService: Title,
              private adminService: AdminService,
              private notify: NzNotificationService,
              private fb: FormBuilder,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Đăng nhập quản trị");
    this.signInForm = this.fb.group({
      inforSignIn: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
    this.active = false;
  }

  SignIn(){
    if(this.signInForm.valid){
      this.active = true;
      this.adminService.signIn(this.signInForm.value).subscribe(
        (response) => {
          this.token = response.data.token;
          this.cookieService.set('token_a', this.token);
          this.router.navigate(['/admin/dashboard']);
          this.alertNotify('success', 'Đăng nhập thành công');
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
