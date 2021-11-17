import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomerService } from '../../service/customer.service';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Component({
  selector: 'app-change-pass-fg',
  templateUrl: './change-pass-fg.component.html',
  styleUrls: ['./change-pass-fg.component.scss']
})
export class ChangePassFgComponent implements OnInit {
  changePass!: FormGroup;
  passwordVisible = false;
  password?: string;
  rePasswordVisible = false;
  email: string = '';
  active: boolean = true;
  constructor(private title: Title,
              private fb: FormBuilder,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.title.setTitle('Đổi mật khẩu');
    this.route.queryParams.subscribe(params => {
      this.email = params['Email'];
    });
    this.changePass = this.fb.group({
      email: this.email,
      password: ['', Validators.compose([Validators.required,
        Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]{8,32}$/),
        Validators.minLength(8)])],
      nhaplaimatKhau: ['', [Validators.required, this.confirmationValidator]],
    })
    this.active = false;
  }

  changePassForgot(){
    if(this.changePass.valid){
      this.active = true;
      this.customerService.changePassForgot(this.changePass.value).subscribe(
        (res) => {
          this.active = false;
          this.alertNotify('success', 'Đổi mật khẩu thành công');
          this.ngOnInit();
        },
        (err) => {
          this.active = false;
          this.alertNotify('error', 'Đổi mật khẩu không thành công')
        }
      )
    }
    else{
      for(const i in this.changePass.controls){
        this.changePass.controls[i].markAsDirty();
        this.changePass.controls[i].updateValueAndValidity();
      }
    }
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

  //Custom Validators
  updateConfirmValidator(): void{
    Promise.resolve().then(() => this.changePass.controls.nhaplaimatKhau.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changePass.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
