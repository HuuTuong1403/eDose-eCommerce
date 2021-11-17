import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BusinessService } from '../../service/business.service';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-forgot-pass-b',
  templateUrl: './forgot-pass-b.component.html',
  styleUrls: ['./forgot-pass-b.component.scss']
})
export class ForgotPassBComponent implements OnInit {
  emailForm!: FormGroup;
  email: string;
  steps: number;
  active: boolean = true;

  constructor(private title: Title,
              private businessService: BusinessService,
              private fb: FormBuilder,
              private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.title.setTitle("Quên mật khẩu doanh nghiệp");
    this.emailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.steps = 1;
    this.active = false;
  }

  onClickNext(): void{
    if(this.emailForm.valid){
      this.active = true;
      this.email = this.emailForm.controls['email'].value;
      this.businessService.getEmailForgotPass(this.email).subscribe(
        (res) => {
          this.active = false;
          this.steps = 2;
        },
        (err) => {
          this.active = false;
          this.alertNotify('error', 'Email của bạn không tồn tại');
        }
      )
    } else{
      this.emailForm.controls['email'].markAsDirty();
      this.emailForm.controls['email'].updateValueAndValidity();
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
}
