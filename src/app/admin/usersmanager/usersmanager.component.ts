//Default
import { Component, OnInit } from '@angular/core';

//Create dialog, notify
import { MatDialog } from '@angular/material/dialog';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';

//Service
import { AdminService } from '../../service/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-usersmanager',
  templateUrl: './usersmanager.component.html',
  styleUrls: ['./usersmanager.component.scss']
})

export class UsersmanagerComponent implements OnInit {
  khachHang: any[] = [];

  err: number;
  token: string = '';
  loading = true;

  constructor(public dialog: MatDialog,
              private adminService: AdminService,
              private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.token = this.adminService.getToken();
    this.getCustomers();
  }

  //getData by adminService
  //Count data
  countDaXacThuc = 0;
  countChuaXacThuc = 0;
  countKhoa = 0;
  getCustomers(): void{
    this.loading = true;
    this.adminService.getUsers(this.token).subscribe(
      (response) => {
        this.khachHang = response;
        this.countDaXacThuc = 0;
        this.countChuaXacThuc = 0;
        this.countKhoa = 0;
        this.khachHang.forEach(item => {
          if(item.tinhTrang === 'Verified'){
            this.countDaXacThuc += 1;
          }
          else if(item.tinhTrang === 'no authentication'){
            this.countChuaXacThuc += 1;
          }
          else if(item.tinhTrang === 'Blocked'){
            this.countKhoa += 1;
          }
        });
        setTimeout(() => {
          this.loading = false;
        }, 200);
      },
      (error)=> {
        this.loading = false;
        this.err = error.status;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu')
      });

  }

  //nzModalDetail
  isVisibleDetail = false;
  detailKhachHang: any;
  showDetail(item: any): void{
    this.detailKhachHang = item;
    this.isVisibleDetail = true;
  }
  cancelDetail(): void{
    this.isVisibleDetail = false
  }

  //Change table with tinhTrang
  flaq = 0;
  clickToChangeDaXacThuc(event){
    this.flaq = 1;
  }
  clickToChangeChuaXacThuc(event){
    this.flaq = 0;
  }
  clickToChangeKhoa(event){
    this.flaq = 2;
  }

  //create notify dialog
  openDialog(notify: string, isVisible: boolean, id: string){
    const dialogRef = this.dialog.open(NotifyDialogComponent, {
      width: '250px',
      height: '200px',
      data: {notify, isVisible, id},
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data.data == 'success'){
        this.isVisibleDetail = false;
        this.getCustomers();
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
