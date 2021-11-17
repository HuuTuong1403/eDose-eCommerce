import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-statistic-c',
  templateUrl: './statistic-c.component.html',
  styleUrls: ['./statistic-c.component.scss']
})
export class StatisticCComponent implements OnInit {
  choose: string = '';
  token: string = '';
  active: boolean = true;

  constructor(private title: Title,
              private customerService: CustomerService,
              private cookieService: CookieService,
              private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('token_c');
    this.title.setTitle('Thống kê');
    this.choose = "Tháng";
    this.getRevenueBill();
    this.getStatisticBill();
  }

  clickMonth(): void{
    this.choose = "Tháng";
  }

  clickTinhTrang(): void{
    this.choose = "Tình trạng đơn hàng";
  }

  listRevenueBill: any[] = [];
  getRevenueBill(){
    this.customerService.getRevenueBill(this.token).subscribe(
      (res) => {
        res.data.forEach(item => {
          this.listRevenueBill.push(item);
        });
        let data = [0, this.listRevenueBill[0].Thang1, this.listRevenueBill[1].Thang2, this.listRevenueBill[2].Thang3, this.listRevenueBill[3].Thang4, this.listRevenueBill[4].Thang5, this.listRevenueBill[5].Thang6, this.listRevenueBill[6].Thang7, this.listRevenueBill[7].Thang8, this.listRevenueBill[8].Thang9, this.listRevenueBill[9].Thang10, this.listRevenueBill[10].Thang11, this.listRevenueBill[11].Thang12];
        let i = 0;
        data.forEach(item => {
          this.barChartDataThang[0].data.push(item);
          this.barChartLabelsThang.push(i.toString());
          i++;
        });
        this.active = false;
      },
      (err) => {
        this.active = true;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  listStatisticBill: any[] = [];
  getStatisticBill(){
    this.customerService.getStatisticBill(this.token).subscribe(
      (res) => {
        res.data.forEach(item => {
          this.listStatisticBill.push(item);
        });
        let data = [this.listStatisticBill[0].Chuatiepnhan, this.listStatisticBill[1].Datiepnhan, this.listStatisticBill[2].Danglayhang, this.listStatisticBill[3].Dalayhang, this.listStatisticBill[4].Khonglayduochang, this.listStatisticBill[5].Danggiaohang, this.listStatisticBill[6].Dagiaohang, this.listStatisticBill[7].Khonggiaoduochang, this.listStatisticBill[8].Trahang, this.listStatisticBill[9].Hoantatdonhang];
        data.forEach(item => {
            this.barChartDataTinhTrang[0].data.push(item);
        });
        this.active = false;
      },
      (err) => {
        this.active = true;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      }
    )
  }

  //Chart foolow month
  public barChartDataThang: ChartDataSets[] = [
    { data: [], backgroundColor: [] },
  ];
  public barChartLabelsThang: Label[] = [];
  public barChartOptionsThang: (ChartOptions) = {
    responsive: true,
    tooltips: {
      callbacks: {
        title: () => null,
        label: function(t, d) {
          var xLabel = 'Tháng ' + d.labels[t.label];
          var yLabel = t.yLabel + ' đơn hàng';
          return xLabel + ': ' + yLabel;
        }
      }
    },
    scales:{
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Số lượng đơn hàng'
        },
        ticks: {
          precision: 0,
          beginAtZero: true,
          callback: function(value, index, values){
            return value + ' đơn';
          }
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Tháng'
        }
      }],
    }
  };
  public barChartColorsThang: Color[] = [{
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0.3)'
  }];
  public barChartLegendThang = false;
  public barChartTypeThang = 'bar';
  public barChartPluginsThang = [];

  //Chart follow tình trạng
  public barChartDataTinhTrang: ChartDataSets[] = [
    { data: [] },
  ];
  public barChartLabelsTinhTrang: Label[] = ['Chưa tiếp nhận', 'Đã tiếp nhận', 'Đang lấy hàng', 'Đã lấy hàng', 'Không lấy được hàng', 'Đang giao hàng', 'Đã giao hàng', 'Không giao được hàng', 'Trả hàng', 'Hoàn tất đơn hàng'];
  public barChartOptionsTinhTrang: (ChartOptions) = {
    responsive: true,
    tooltips: {
      callbacks: {
        title: () => null,
        label: function(t, d) {
          var xLabel = d.labels[t.index];
          var yLabel = t.yLabel + ' đơn hàng';
          return xLabel + ': ' + yLabel;
        }
      }
    },
    scales:{
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Số lượng',
        },
        ticks: {
          precision: 0,
          beginAtZero: true,
          callback: function(value, index, values){
            return value + ' đơn';
          }
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Tình trạng'
        }
      }]
    }
  };
  public barChartColorsTinhTrang: Color[] = [{
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0.3)',
  }];
  public barChartLegendTinhTrang = false;
  public barChartTypeTinhTrang = 'bar';
  public barChartPluginsTinhTrang = [];

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
