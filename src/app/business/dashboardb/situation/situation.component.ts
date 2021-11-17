import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BusinessService } from '../../../service/business.service';
import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-situation',
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.scss']
})
export class SituationComponent implements OnInit {
  category = "";
  active = true;
  token: string = '';
  constructor(private title: Title,
              private notify: NzNotificationService,
              private businessService: BusinessService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.title.setTitle('Theo dõi tình hình kinh doanh');
    this.token = this.cookieService.get('token_b');
    this.category = 'revenue';
    this.getRevenueBill();
    this.getSumOrder();
  }

  listRevenueBill: any[] = [];
  getRevenueBill(){
    this.businessService.getRevenueBill(this.token).subscribe(
      (res) => {
        res.data.forEach(item => {
          this.listRevenueBill.push(item);
        });
        let data = [0, this.listRevenueBill[0].Thang1, this.listRevenueBill[1].Thang2, this.listRevenueBill[2].Thang3, this.listRevenueBill[3].Thang4, this.listRevenueBill[4].Thang5, this.listRevenueBill[5].Thang6, this.listRevenueBill[6].Thang7, this.listRevenueBill[7].Thang8, this.listRevenueBill[8].Thang9, this.listRevenueBill[9].Thang10, this.listRevenueBill[10].Thang11, this.listRevenueBill[11].Thang12];
        let i = 0;
        data.forEach(item => {
          this.barChartDataDoanhThuThang[0].data.push(item);
          this.barChartLabelsDoanhThuThang.push(i.toString());
          i++;
        })
        this.active = false;
      },
      (err) => {
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình lấy dữ liệu')
      }
    );
  }

  listSumOrder: any[] = [];
  getSumOrder(){
    this.businessService.getSumOrder(this.token).subscribe(
      (res) => {
        console.log(res);
        res.data.forEach(item => {
          this.listSumOrder.push(item);
        });
        let data = [0, this.listSumOrder[0].Thang1, this.listSumOrder[1].Thang2, this.listSumOrder[2].Thang3, this.listSumOrder[3].Thang4, this.listSumOrder[4].Thang5, this.listSumOrder[5].Thang6, this.listSumOrder[6].Thang7, this.listSumOrder[7].Thang8, this.listSumOrder[8].Thang9, this.listSumOrder[9].Thang10, this.listSumOrder[10].Thang11, this.listSumOrder[11].Thang12];
        let i = 0;
        data.forEach(item => {
          this.barChartDataSumOrderThang[0].data.push(item);
          this.barChartLabelsSumOrderThang.push(i.toString());
          i++;
        })
        this.active = false;
      },
      (err) => {
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
  public barChartDataDoanhThuThang: ChartDataSets[] = [
    { data: [] }
  ];
  public barChartLabelsDoanhThuThang: Label[] = [];
  public barChartOptionsDoanhThuThang: (ChartOptions) = {
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
          precision: 0,
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
        },
      }],
    }
  };
  public barChartColorsDoanhThuThang: Color[] = [{
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0.3)',
  }];
  public barChartLegendDoanhThuThang = false;
  public barChartTypeDoanhThuThang = 'bar';
  public barChartPluginsDoanhThuThang = [];

  //Chart SumOrder
  public barChartDataSumOrderThang: ChartDataSets[] = [
    { data: [] },
  ];
  public barChartLabelsSumOrderThang: Label[] = [];
  public barChartOptionsSumOrderThang: (ChartOptions) = {
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
          beginAtZero: true,
          precision: 0,
          callback: function(value, index, values){
            return value + ' đơn';
          }
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Tháng'
        },
      }],
    }
  };
  public barChartColorsSumOrderThang: Color[] = [{
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0.3)',
  }];
  public barChartLegendSumOrderThang = false;
  public barChartTypeSumOrderThang = 'bar';
  public barChartPluginsSumOrderThang = [];

}
