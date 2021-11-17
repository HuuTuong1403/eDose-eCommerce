import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoWhiteSpaceValidator } from '../../validators/no-whitespace.validator';
import { BusinessService } from '../../service/business.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signupb',
  templateUrl: './signupb.component.html',
  styleUrls: ['./signupb.component.scss']
})
export class SignupbComponent implements OnInit {
  isLinear = false;
  signUpForm: FormGroup;
  steps: number;
  districtArray: any[] = [];
  active = true;

  constructor(private title: Title,
    private businessService: BusinessService,
    private router: Router,
    private notify: NzNotificationService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.title.setTitle("Đăng ký doanh nghiệp");
    this.steps = 1;
    this.signUpForm = this.fb.group({
      firstForm: this.fb.group({
        userName: ["", [Validators.required, Validators.minLength(8), NoWhiteSpaceValidator()]], /*[this.userNameAsyncValidator]]*/
        passWord: ["", Validators.compose([Validators.required,
                                           Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]{8,32}$/),
                                           Validators.minLength(8)])],
        repassWord: ["", [Validators.required, this.confirmationValidator]],
        soDT: ["", Validators.required],
        email: ["", [Validators.email, Validators.required]],
      }),
      secondForm: this.fb.group({
        tenDN: ["", [Validators.required]],
        diaChi: ["", [Validators.required]],
        nguoiDD: ["", [Validators.required]],
        chucVu: ["", [Validators.required]],
        maSoThue: ["", [Validators.required]],
      }),
      thirdForm: this.fb.group({
        ques1: ["", [Validators.required]],
        ques2: ["", [Validators.required]],
        ques3: ["", [Validators.required]],
        website: ["", [Validators.required]],
        moTa: ["", [Validators.required, Validators.maxLength(1000)]],
      })
    });
    this.getDistrict();
  }

  getDistrict(){
    this.businessService.getDistrictInHoChiMinhGHN().subscribe(
      (res) => {
        this.active = false;
        res.data.forEach(item => {
          switch(item.DistrictID){
            case 3695:
            case 3449:
            case 3448:
            case 2090:
            case 1580:
            case 1534:
              break;
            default:
              this.districtArray.push(item);
          }
        })
      },
      (err) => {
         this.active = false;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    );
  }

  onSubmit(): void{
    this.nextStep();
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

  get firstForm(){
    return this.signUpForm.get('firstForm');
  }

  get secondForm(){
    return this.signUpForm.get('secondForm');
  }

  get thirdForm(){
    return this.signUpForm.get('thirdForm');
  }

  nextStep(): void{
    if(this.steps === 1){
      if(this.firstForm.valid){
        this.steps = 2;
      }
      else
      {
        this.checkValidForm(this.firstForm);
      }
    }
    else if(this.steps === 2){
      if(this.secondForm.valid){
        this.steps = 3;
      }
      else
      {
        this.checkValidForm(this.secondForm);
      }
    }
    else if(this.steps === 3){
      if(this.thirdForm.valid){
        this.active = true;
        this.businessService.signUp(this.signUpForm.value).subscribe(
          (response) => {
            this.active = false;
            this.alertNotify('success', 'Đăng ký tài khoản doanh nghiệp thành công');
            this.steps = 4;
            this.signUpForm.reset();
          },
          (error) => {
            this.active = false;
            this.alertNotify('error', error.error.message);
          })
      }
      else{
        this.checkValidForm(this.thirdForm);
      }
    }
  }

  checkValidForm(form: AbstractControl){
    for(const field in form.value){
      form.get(field).markAsDirty();
      form.get(field).updateValueAndValidity();
    }
  }

  backStep(): void{
    this.steps -= 1;
    if(this.steps == 0)
    {
      this.steps = 1;
    }
  }

  change(i: number){
    this.steps = i;
  }

  //Custom Validators
  updateConfirmValidator(): void{
    Promise.resolve().then(() => this.firstForm.get('repassWord').updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.firstForm.get('passWord').value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
