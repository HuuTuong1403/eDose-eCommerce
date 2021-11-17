import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoWhiteSpaceValidator } from '../../validators/no-whitespace.validator';
import { Observable, of, Observer } from 'rxjs';
import { CustomerService } from '../../service/customer.service';
import { AdminService } from '../../service/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupc',
  templateUrl: './signupc.component.html',
  styleUrls: ['./signupc.component.scss']
})
export class SignupcComponent implements OnInit {
  passwordVisible = false;
  password?: string;
  rePasswordVisible = false;
  active = true;
  signUpForm!: FormGroup;
  token: string = '';
  constructor(private title: Title,
              private fb: FormBuilder,
              private customerService: CustomerService,
              private notify: NzNotificationService,
              private router: Router) { }

  ngOnInit(): void {
    this.active = false;
    this.title.setTitle('Đăng ký khách hàng');
    this.signUpForm = this.fb.group({
      hoVaTen: ["", [Validators.required]],
      tenDangNhap: ["", [Validators.required, Validators.minLength(8), NoWhiteSpaceValidator()]],
      matKhau: ["", Validators.compose([Validators.required,
                                          Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]{8,32}$/),
                                          Validators.minLength(8)])],
      nhaplaimatKhau: ["", [Validators.required, this.confirmationValidator]],
      ngaySinh: ["", [Validators.required]],
      soDienThoai: ["", [Validators.required, Validators.minLength(10)]],
      email: ["", [Validators.email, Validators.required]],
      diaChi: ["", [Validators.required]],
    });
  }

  //SignUp
  submitForm(): void{
    if(this.signUpForm.valid){
      this.active = true;
      this.customerService.signUp(this.signUpForm.value).subscribe(
        (response) => {
          if(response.message == "Sucessfully"){
            this.active = false;
            this.alertNotify('success', 'Đăng ký tài khoản khách hàng thành công');
            this.signUpForm.reset();
            setTimeout(() => {
              this.router.navigate(['customer/signin']);
            }, 3000);
          }
        },
        (error) => {
          this.active = false;
          console.log(error);
          if(error.error.message){
            this.alertNotify('error', error.error.message);
          }
          else{
            this.alertNotify('error', 'Email này đã vi phạm lỗi và đã bị xóa');
          }
        })
    }
    else{
      for(const i in this.signUpForm.controls){
        this.signUpForm.controls[i].markAsDirty();
        this.signUpForm.controls[i].updateValueAndValidity();
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
    Promise.resolve().then(() => this.signUpForm.controls.nhaplaimatKhau.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls.matKhau.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
