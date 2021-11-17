import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-packageservice',
  templateUrl: './packageservice.component.html',
  styleUrls: ['./packageservice.component.scss']
})

@Injectable({ providedIn: 'any'})
export class PackageserviceComponent implements OnInit {
  formUpdatePackage!: FormGroup;
  formAddPackage!: FormGroup;
  namePackage = '';
  active = true;
  steps: number;
  p: number = 1;
  token: string = '';
  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private notify: NzNotificationService,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.steps = 1;
    this.token = this.adminService.getToken();
    this.getListServicePackage();
    this.createFormGroup();
  }

  createFormGroup(){
    this.formUpdatePackage = this.fb.group({
      maGoiDV: ["", Validators.required],
      tenGoiDV: ["", [Validators.required]],
      soDonHang: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      khoiLuongHang: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      cuocPhi: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      thoiGianSuDung: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
    });
    this.formAddPackage = this.fb.group({
      maGoiDV: ["", [Validators.required]],
      tenGoiDV: ["", [Validators.required]],
      soDonHang: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      khoiLuongHang: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      cuocPhi: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
      thoiGianSuDung: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
    });
  }
  exit(){
    this.steps = 1;
  }

  addServicePackage(){
    if(this.formAddPackage.valid){
      this.active = true;
      this.adminService.addServicePackage(this.token, this.formAddPackage.value).subscribe(
        (res) => {
          this.active = false;
          this.alertNotify('success', 'Tạo gói dịch vụ thành công');
          this.formAddPackage.reset();
          this.getListServicePackage();
          this.namePackage = '';
        },
        (err) => {
          this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu')
        }
      )
    }
    else{
      for(const i in this.formUpdatePackage.controls){
        this.formUpdatePackage.controls[i].markAsDirty();
        this.formUpdatePackage.controls[i].updateValueAndValidity();
      }
    }
  }

  goiDichVu: any[] = [];
  getListServicePackage(){
    this.active = true;
    this.adminService.getListServicePackage(this.token).subscribe(
      (res) => {
        this.active = false;
        this.goiDichVu = res;
      },
      (err) => {
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu')
      }
    )
  }

  submitForm(id: string): void{
    if(this.formUpdatePackage.valid){
      this.adminService.updateServicePackage(this.token, this.formUpdatePackage.value, id).subscribe(
        (res) => {
          this.isVisibleDetail = false;
          this.isClickUpdate = !this.isClickUpdate;
          this.getListServicePackage();
          this.formUpdatePackage.reset();
          this.alertNotify('success', 'Chỉnh sửa gói dịch vụ thành công')
        },
        (err) => {
          this.alertNotify('error', 'Chỉnh sửa gói dịch vụ thất bại')
        }
      )
    }
    else{
      for(const i in this.formUpdatePackage.controls){
        this.formUpdatePackage.controls[i].markAsDirty();
        this.formUpdatePackage.controls[i].updateValueAndValidity();
      }
    }
  }

  //nzModalDetail
  isVisibleDetail = false;
  updateGoiDichVu: any;
  showDetail(item: any): void{
    this.updateGoiDichVu = item;
    this.isVisibleDetail = true;
  }
  cancelDetail(): void{
    this.isClickUpdate = false;
    this.isVisibleDetail = false
  }

  //Event when click Update PackageService
  isClickUpdate = false;
  clickUpdate(item: any): void{
    this.isClickUpdate = true;
    this.formUpdatePackage.patchValue({
      maGoiDV: item.maGoiDV,
      tenGoiDV: item.tenGoiDV,
      soDonHang: item.soDonHang,
      khoiLuongHang: item.khoiLuongHang,
      thoiGianSuDung: item.thoiGianSuDung,
      cuocPhi: item.cuocPhi,
    });
  }

  deletePackage(notify: String, isVisible: boolean, id: string): void{
    const dialogRef = this.dialog.open(NotifyDialogComponent, {
      width: '260px',
      height: '180px',
      data: {notify, isVisible, id},
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data.data == 'success'){
        this.isVisibleDetail = false;
        this.getListServicePackage();
      }
      else{
        this.isVisibleDetail = true;
      }
    })
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
