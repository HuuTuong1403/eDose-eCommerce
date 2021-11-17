import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.scss']
})
export class NotifyDialogComponent implements OnInit {

  token: string = '';

 constructor(public dialogRef: MatDialogRef<NotifyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {notify: string, name: string, id: string},
              private notify: NzNotificationService,
              private adminService: AdminService) {}

  ngOnInit(): void {
    this.token = this.adminService.getToken();
  }
  onNoClick(): void{
    this.dialogRef.close({event: 'close', data: this.data});
  }

  //createNotify
  createNotify(): void{
    switch(this.data.notify){
      case 'từ chối doanh nghiệp':
        this.adminService.deniedBusinessApproval(this.token, this.data.id).subscribe(
          (res) => {
            this.alertNotify('success', `Bạn đã ${this.data.notify} ${this.data.name} thành công!`)
            this.dialogRef.close( {event: 'close', data: 'success'} );
          },
          (err) => {
            this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình từ chối doanh nghiệp')
            this.dialogRef.close( {event: 'close', data: 'error'} );
          }
        );
        break;
      case 'duyệt doanh nghiệp':
        this.adminService.businessAccountApproval(this.token, this.data.id).subscribe(
          (res) => {
            this.alertNotify('success', `Bạn đã ${this.data.notify} ${this.data.name} thành công!`)
            this.dialogRef.close( {event: 'close', data: 'success'} );
          },
          (err) => {
            this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình duyệt doanh nghiệp')
            this.dialogRef.close( {event: 'close', data: 'error'} );
          }
        );
        break;
      case 'khóa khách hàng':
        this.adminService.blockUser(this.token, this.data.id).subscribe(
          (res) => {
            this.alertNotify('success', `Bạn đã ${this.data.notify} này!`)
            this.dialogRef.close({event: 'close', data: 'success'});
          },
          (err) => {
            this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình khóa khách hàng')
            this.dialogRef.close({event: 'close', data: 'error'});
          }
        )
        break;
      case 'mở khóa khách hàng':
        this.adminService.unBlockUser(this.token, this.data.id).subscribe(
          (res) => {
            this.alertNotify('success', `Bạn đã ${this.data.notify} này!`)
            this.dialogRef.close({event: 'close', data: 'success'});
          },
          (err) => {
            this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình mở khóa khách hàng')
            this.dialogRef.close({event: 'close', data: 'error'});
          }
        )
        break;
      case 'xóa khách hàng':
        this.adminService.deleteUser(this.token, this.data.id).subscribe(
          (res) => {
            this.alertNotify('success', `Bạn đã ${this.data.notify} này!`)
            this.dialogRef.close({event: 'close', data: 'success'});
          },
          (err) => {
            this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình xóa khách hàng')
            this.dialogRef.close({event: 'close', data: 'error'});
          }
        )
        break;
      case 'xóa gói dịch vụ':
        this.adminService.deleteServicePackage(this.token, this.data.id).subscribe(
          (res) => {
            this.alertNotify('success', `Bạn đã ${this.data.notify} này!`)
            this.dialogRef.close({event: 'close', data: 'success'});
          },
          (err) => {
            this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình xóa khách hàng')
            this.dialogRef.close({event: 'close', data: 'error'});
          }
        )
        break;
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
