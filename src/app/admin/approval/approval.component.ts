import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';
import { AdminService } from '../../service/admin.service'
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {

  err: number;
  loading = true;
  token: string = '';

  constructor(private dialog: MatDialog,
              private adminService: AdminService,
              private notify: NzNotificationService,) {}

  ngOnInit(): void {
    this.token = this.adminService.getToken();
    this.getCompanies();
  }

  company: any[] = [];
  countDaDuyet = 0;
  countChuaDuyet = 0;
  countDaTuChoi = 0;
  getCompanies(): void{
    this.loading = true;
    this.adminService.getListBusiness(this.token).subscribe(
      (res) => {
        this.company = res;
        this.countDaDuyet = 0;
        this.countChuaDuyet = 0;
        this.countDaTuChoi = 0;
        this.company.forEach(item => {
          if(item.tinhTrang === 'waitingforapproval'){
            this.countChuaDuyet += 1;
          }
          else if(item.tinhTrang === 'Approval'){
            this.countDaDuyet += 1;
          }
          else if(item.tinhTrang === 'DeniedApproval'){
            this.countDaTuChoi += 1;
          }
        });
        setTimeout(() => {
          this.loading = false;
        }, 200);
      },
      (err) => {
        this.loading = true;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  flaq = 0;
  clickToChangeDaDuyet(event){
    this.flaq = 1;
  }
  clicktoChangeChuaDuyet(event){
    this.flaq = 0;
  }
  clickToChangeTuChoi(event){
    this.flaq = 2;
  }

  //nzModalDetail
  detailCompany: any;
  isVisibleDetail = false;
  imageObject: Array<object> = [];
  showDetail(item: any): void{
    this.detailCompany = item;
    this.imageObject = [
      { image: this.detailCompany.hinhGPKD },
      { image: this.detailCompany.logo }];
    this.isVisibleDetail = true;
  }
  cancelDetail():void{
    this.isVisibleDetail = false;
  }

  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  showLightbox(index) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }
  closeEventHandler() {
    this.showFlag = false;
    this.selectedImageIndex = -1;
  }



  openDialog(notify: string, name: string, id: string){
    const dialogRef = this.dialog.open(NotifyDialogComponent, {
      width: '250px',
      height: '200px',
      data: { notify, name, id },
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data.data == 'success'){
        this.isVisibleDetail = false;
        this.getCompanies();
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
