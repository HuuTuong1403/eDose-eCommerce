import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessService } from '../../../service/business.service';
import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dialog-business',
  templateUrl: './dialog-business.component.html',
  styleUrls: ['./dialog-business.component.scss']
})
export class DialogBusinessComponent implements OnInit {
  token: string = '';
  constructor(public dialogRef: MatDialogRef<DialogBusinessComponent>, @Inject(MAT_DIALOG_DATA) public data: {notify: string, isVisible: boolean, id: string},
              private businessService: BusinessService,
              private cookieService: CookieService,
              private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('token_b');
  }

  onNoClick(): void{
    this.data = {notify: 'hủy', isVisible: true, id: ''}
    this.dialogRef.close({event: 'close', data: this.data, type: 'close'});
  }

  onAccept(): void{
    switch(this.data.notify){
      case 'huỷ gói dịch vụ đang đăng ký':
        this.businessService.cancelPackageIsRegister(this.token).subscribe(
          (res) => {
            this.dialogRef.close({event: 'close', data: 'success', type: 'cancel'});
          },
          (err) => {
            this.dialogRef.close({event: 'close', data: 'error', type: 'close-cancel'});
          }
        )
        break;
      case 'xóa khuyến mãi':
        this.businessService.deletePromotion(this.token, this.data.id).subscribe(
          (res) => {
            this.dialogRef.close({event: 'close', data: 'success'});
          },
          (err) => {
            this.dialogRef.close({event: 'close', data: 'error'});
          }
        )
        break;
      case 'đăng ký gói dịch vụ':
        this.businessService.registerPackageService(this.token, this.data.id).subscribe(
          (res) => {
            this.dialogRef.close({event: 'close', data: res, type: 'success'});
          },
          (err) => {
            this.dialogRef.close({event: 'close', data: err, type: 'error'});
          }
        )
        break;
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
