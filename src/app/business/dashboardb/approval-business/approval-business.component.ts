import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from '../../../service/business.service'
import { Title } from '@angular/platform-browser';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-business',
  templateUrl: './approval-business.component.html',
  styleUrls: ['./approval-business.component.scss']
})
export class ApprovalBusinessComponent implements OnInit {
  active = true;
  token: string = '';
  steps: number;
  formApproval: FormGroup;
  @ViewChild('ImageLogo') ImageLogo!: ElementRef;
  logo!: File;
  @ViewChild('ImageGPKD') ImageGPKD!: ElementRef;
  gpkd!: File;

  constructor(private title: Title,
              private cookieService: CookieService,
              private businessService: BusinessService,
              private fb: FormBuilder,
              private notify: NzNotificationService,
              private router: Router) {}

  ngOnInit(): void {
    this.active = false;
    this.steps = 1;
    this.token = this.cookieService.get('token_b');
    this.title.setTitle('Xin phê duyệt doanh nghiệp');
    this.createForm();
    this.getInfor();
  }

  logOut(): void {
    this.alertNotify('success', 'Bạn đã đăng xuất khỏi hệ thống');
    this.businessService.deleteToken();
    this.router.navigate(['/business/signin']);
  }

  doanhNghiep: any;
  getInfor(){
    this.active = true;
    this.businessService.getInforBusiness(this.token).subscribe(
      (res) => {
        this.doanhNghiep = res;
        this.active = false;
        if(this.doanhNghiep.tinhTrang === 'DeniedApproval'){
          this.alertNotify('error', 'Doanh nghiệp của bạn đã bị từ chối bởi hệ thống của chúng tôi');
        }
      },
      (err) => {
        this.active = true;
        this.alertNotify('error', 'Xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  onSubmitApproval(){
    if(this.formApproval.valid){
      this.active = true;
      let uploadFile = new FormData();
      uploadFile.append('upload_preset', 'logo-business');
      if(this.logo != null){
        uploadFile.append('file', this.logo);
        this.businessService.uploadLogo(uploadFile).subscribe(
          (res) => {
            let formApproval = this.createFormData(res.secure_url);
            this.businessService.approvalBusiness(formApproval, this.token).subscribe(
              (response) => {
                this.steps = 1;
                this.formApproval.reset();
                this.active = false;
                this.alertNotify('success', 'Đã gửi yêu cầu phê duyệt thành công')
              },
              (error) => {
                this.active = false;
                this.alertNotify('error', 'Đã xảy ra lỗi khi gửi phê duyệt')
              }
            )
          },
          (err) => {
            this.active = false;
            this.alertNotify('error', 'Đã xảy ra lỗi khi uplad hình ảnh')
          }
        )
      }
    }
    else{
      for(const i in this.formApproval.controls){
        this.formApproval.controls[i].markAsDirty();
        this.formApproval.controls[i].updateValueAndValidity();
      }
    }
  }

  nextSteps(){
    if(this.steps == 1){
      if(this.firstForm.valid){
        this.steps = 2;
      }
      else
        this.checkValidForm(this.firstForm);
    }
    else if(this.steps == 2){
      if(this.secondForm.valid){
        this.steps = 3;
      }
      else{
        this.checkValidForm(this.secondForm);
      }
    }
  }

  checkValidForm(form: AbstractControl){
    for(const field in form.value){
      form.get(field).markAsDirty();
      form.get(field).updateValueAndValidity();
    }
  }

  createForm(){
    this.formApproval = this.fb.group({
      firstForm: this.fb.group({
        soDTNguoiDD: ["", [Validators.required]],
        nguoiDD: ["", [Validators.required]],
        chucVu: ["", [Validators.required]],
        maDoanhNghiep: ["", [Validators.required]],
        hinhGPKD: ["", [Validators.required]],
        logo: ["", [Validators.required ,RxwebValidators.extension({extensions:["jpeg", "png", "jpg"]})]]
      }),
      secondForm: this.fb.group({
        soTK: ["", [Validators.required]],
        chuTK: ["", [Validators.required]],
        tenNganHang: ["", [Validators.required]],
        thanhPho: ["", [Validators.required]],
        chiNhanh: ["", [Validators.required]],
      })
    })
  }


  createFormData(Image: string): FormData{
    let formApproval = new FormData();
    formApproval.append("soDTNguoiDD", this.firstForm.get('soDTNguoiDD').value);
    formApproval.append("nguoiDD", this.firstForm.get('nguoiDD').value);
    formApproval.append("chucVu", this.firstForm.get('chucVu').value);
    formApproval.append("maDoanhNghiep", this.firstForm.get('maDoanhNghiep').value);
    formApproval.append('image', this.gpkd, this.gpkd.name);
    formApproval.append('logo', Image);
    formApproval.append("soTK", this.secondForm.get('soTK').value);
    formApproval.append("chuTK", this.secondForm.get('chuTK').value);
    formApproval.append("tenNganHang", this.secondForm.get('tenNganHang').value);
    formApproval.append("thanhPho", this.secondForm.get('thanhPho').value);
    formApproval.append("chiNhanh", this.secondForm.get('chiNhanh').value);
    return formApproval;
  }

  get firstForm(){
    return this.formApproval.get('firstForm');
  }

  get secondForm(){
    return this.formApproval.get('secondForm');
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

  //Giấy phép kinh doanh
  isClearGPKD = false;
  onFileChangeGPKD(e: any) {
    this.isClearGPKD = true;
    this.gpkd = e.target.files[0];
  }
  resetGPKD(){
    this.isClearGPKD = !this.isClearGPKD;
    this.ImageGPKD.nativeElement.value = "";
  }

  //Logo công ty
  isClearLogo = false;
  onFileChangeLogo(e: any) {
    this.isClearLogo = true;
    this.logo = e.target.files[0];
  }
  resetLogo(){
    this.isClearLogo = !this.isClearLogo;
    this.ImageLogo.nativeElement.value = "";
  }
}
