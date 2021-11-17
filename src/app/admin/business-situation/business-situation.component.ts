import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CookieService } from 'ngx-cookie-service'
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-business-situation',
  templateUrl: './business-situation.component.html',
  styleUrls: ['./business-situation.component.scss']
})
export class BusinessSituationComponent implements OnInit {

  company: any[] = [];
  tabs: Array<{ name: string }> = [];
  position = 'bottom';
  loading = true;
  token = '';

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private cookieService: CookieService,
              private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('token_a');
    this.getRevenueService();
    for (let i = 1; i <= 12; i++) {
      this.tabs.push({
        name: `${i}`
      });
    }
    this.getTrackRevenue();
  }

  dataMonth: any[] = [];
  onClick(name: string){
    let i = parseInt(name) - 1;
    switch(i){
      case 0:
        this.dataMonth = this.listTrackMonth[i].Thang1;
        break;
      case 1:
        this.dataMonth = this.listTrackMonth[i].Thang2;
        break;
      case 2:
        this.dataMonth = this.listTrackMonth[i].Thang3;
        break;
      case 3:
        this.dataMonth = this.listTrackMonth[i].Thang4;
        break;
      case 4:
        this.dataMonth = this.listTrackMonth[i].Thang5;
        break;
      case 5:
        this.dataMonth = this.listTrackMonth[i].Thang6;
        break;
      case 6:
        this.dataMonth = this.listTrackMonth[i].Thang7;
        break;
      case 7:
        this.dataMonth = this.listTrackMonth[i].Thang8;
        break;
      case 8:
        this.dataMonth = this.listTrackMonth[i].Thang9;
        break;
      case 9:
        this.dataMonth = this.listTrackMonth[i].Thang10;
        break;
      case 10:
        this.dataMonth = this.listTrackMonth[i].Thang11;
        break;
      case 11:
        this.dataMonth = this.listTrackMonth[i].Thang12;
        break;
    }
  }

  log(args: any[]): void {

  }

  listTrackMonth: any;
  getTrackRevenue(){
    this.adminService.getTrackRevenue(this.token).subscribe(
      (res) => {
        this.listTrackMonth = res.data;
        this.onClick('1');
      },
      (err) => {
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  listRevenueService: any[] = [];
  getRevenueService(){
    this.adminService.getRevenueServicePackage(this.token).subscribe(
      (res) => {
        res.data.forEach(item => {
          this.listRevenueService.push(item);
        });
        let data = ['', this.listRevenueService[0].Thang1, this.listRevenueService[1].Thang2, this.listRevenueService[2].Thang3, this.listRevenueService[3].Thang4, this.listRevenueService[4].Thang5, this.listRevenueService[5].Thang6, this.listRevenueService[6].Thang7, this.listRevenueService[7].Thang8, this.listRevenueService[8].Thang9, this.listRevenueService[9].Thang10, this.listRevenueService[10].Thang11, this.listRevenueService[11].Thang12];
        let i = 0;
        data.forEach(item => {
          this.lineChartData[0].data.push(item);
          this.lineChartLabels.push(i.toString());
          i++;
        });
        this.loading = false;
      },
      (err) => {
        this.loading = true;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
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

  //Chart Revenue
  public lineChartData: ChartDataSets[] = [
    { data: [] },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    tooltips: {
      callbacks: {
        title: () => null,
        label: function(t, d) {
          var xLabel = 'Tháng ' + d.labels[t.label];
          var yLabel = t.yLabel >= 1000 ? t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'đ' : t.yLabel + 'đ';
          return xLabel + ': ' + yLabel;
        }
      }
    },
    scales:{
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Doanh thu'
        },
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values){
            if(value >= 1000){
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'đ';
            }
            else{
              return value + 'đ';
            }
          }
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Tháng'
        }
      }]
    }
  };
  public lineChartColors: Color[] = [{
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0.3)',
  }];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];


}
