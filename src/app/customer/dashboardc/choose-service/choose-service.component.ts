import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-choose-service',
  templateUrl: './choose-service.component.html',
  styleUrls: ['./choose-service.component.scss']
})
export class ChooseServiceComponent implements OnInit {
  value: any;
  steps: number;
  chooseService: FormGroup;
  test:boolean = false;
  active:boolean = true;
  From:string = "";
  To:string = "";
  token: string = '';
  user: any;
  Send: string = '';
  Receiver: string = '';
  chooseMaKM: any = undefined;

  constructor(private title: Title,
              private fb: FormBuilder,
              private notify: NzNotificationService,
              private customerService: CustomerService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.title.setTitle("Lựa chọn dịch vụ");
    this.steps = 1;
    this.token = this.cookieService.get("token_c");
    this.getUser();
    this.getDistrictInHCM();
    this.chooseService = this.fb.group({
      addressForm: this.fb.group({
        addressFrom: ["", [Validators.required]],
        sender_district: ["", [Validators.required]],
        sender_ward: ["", [Validators.required]],
        addressTo: ["", [Validators.required]],
        receiver_district: ["", [Validators.required]],
        receiver_ward: ["", [Validators.required]],
      }),
      OrderForm: this.fb.group({
        marchandiseName: ["", Validators.required],
        weight: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
        value: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
        length: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
        height: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
        width: ["", [Validators.required, Validators.pattern(/[0-9]/)]],
        soDienThoai: ["", Validators.required],
        hoTen: ["", Validators.required],
        email: ["", Validators.required],
      }),
      doanhNghiepForm: this.fb.group({
        doanhNghiep: ["", Validators.required],
      }),
      choosePayment: this.fb.group({
        payment: ["", Validators.required],
      })
    });
  }

  wardReceiver: any[] = [];
  wardSend: any[] = [];
  idSendDistrict: string;
  idReceiverDistrict: string;
  idSendWard: string;
  NameSendWard: string;
  idReceiverWard: string;
  NameReceiverWard: string;
  //Lấy ID Huyện và tên Huyện
  onChangeWard(event: any, type: string){
    if(type === 'Receiver'){
      this.Receiver = event;
      this.NameReceiverWard = event.substr(0, event.indexOf('/'));
      this.idReceiverWard = event.slice(event.lastIndexOf('/') + 1);
    }
    else{
      this.Send = event;
      this.NameSendWard = event.substr(0, event.indexOf('/'));
      this.idSendWard = event.slice(event.lastIndexOf('/') + 1);
    }
  }

  //Lấy Huyện khi chọn Quận
  onChangeDistrict(event: any, type: string){
    if(type === 'Receiver'){
      this.Receiver = ''
      for(let i = 0; i < this.district.length; i++){
        if(this.district[i].DistrictName === event){
          this.idReceiverDistrict = this.district[i].DistrictID;
        }
      }
      this.customerService.getWardInDistrictGHN(this.idReceiverDistrict).subscribe(
        (res) => {
          this.wardReceiver = res.data;
        },
        (err) => {
          this.alertNotify('error', 'Đã xảy ra lỗi khi lấy dữ liệu')
        }
      )
    }
    else{
      this.Send = ''
      for(let i = 0; i < this.district.length; i++){
        if(this.district[i].DistrictName === event){
          this.idSendDistrict = this.district[i].DistrictID;
        }
      }
      this.customerService.getWardInDistrictGHN(this.idSendDistrict).subscribe(
        (res) => {
          this.wardSend = res.data;
        },
        (err) => {
          this.alertNotify('error', 'Đã xảy ra lỗi khi lấy dữ liệu')
        }
      )
    }
  }

  //Lấy tất cả quận trong TP. HCM
  district: any[] = [];
  getDistrictInHCM(){
    this.active = true;
    this.customerService.getDistrictInHoChiMinhGHN().subscribe(
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
              this.district.push(item);
          }
        })
      },
      (err) => {
        this.alertNotify('error', 'Đã xảy ra lỗi khi lấy dữ liệu')
      }
    )
  }

  get addressForm(){
    return this.chooseService.get('addressForm');
  }
  get OrderForm(){
    return this.chooseService.get('OrderForm');
  }
  get doanhNghiepForm(){
    return this.chooseService.get('doanhNghiepForm');
  }
  get choosePayment(){
    return this.chooseService.get('choosePayment');
  }

  //Kiểm tra dữ liệu nhập
  checkValidForm(form: AbstractControl){
    for(const field in form.value){
      form.get(field).markAsDirty();
      form.get(field).updateValueAndValidity();
    }
  }

  //Tạo data tìm công ty cung cấp dịch vụ
  createFormSearchProvider(): any{
    let data = {
      "sender_district" : this.addressForm.get('sender_district').value,
      "sender_district_id" : this.idSendDistrict,
      "sender_ward" : this.NameSendWard,
      "receiver_district" : this.addressForm.get('receiver_district').value,
      "receiver_district_id" : this.idReceiverDistrict,
      "receiver_ward_id" : this.idReceiverWard,
      "receiver_ward" : this.NameReceiverWard,
      "weight" : parseInt(this.OrderForm.get('weight').value),
      "value" : this.OrderForm.get('value').value,
      "receiver_address" : this.addressForm.get('addressTo').value,
      "length" : parseInt(this.OrderForm.get('length').value),
      "height" : parseInt(this.OrderForm.get('height').value),
      "width" : parseInt(this.OrderForm.get('width').value),
    }
    return data;
  }

  //Tạo đơn hàng ứng với công ty đã chọn
  createFormOrderService(): any{
    let cost: any;
    switch(this.nameDN){
      case 'SUPERSHIP VIETNAM JOINT STOCK COMPANY': {
        cost = this.superShip.fee;
        break;
      }
      case 'Giao Hàng Tiết Kiệm': {
        cost = this.giaoHangTietKiem.fee.fee;
        break;
      }
      case 'Giao Hàng Nhanh': {
        cost = this.giaoHangNhanh.data.total;
        break;
      }
    }
    let km = '';
    if(this.chooseMaKM == undefined){
      km = '';
    }
    else{
      km = this.chooseMaKM.maKM;
    }
    let data = {
      "marchandiseName": this.OrderForm.get('marchandiseName').value,
      "phoneNumber": this.OrderForm.get('soDienThoai').value,
      "sender_district" : this.addressForm.get('sender_district').value,
      "sender_ward" : this.NameSendWard,
      "receiver_district" : this.addressForm.get('receiver_district').value,
      "receiver_ward" : this.NameReceiverWard,
      "weight" : parseInt(this.OrderForm.get('weight').value),
      "value" : this.OrderForm.get('value').value,
      "sender_address": this.addressForm.get('addressFrom').value,
      "receiver_address" : this.addressForm.get('addressTo').value,
      "length" : parseInt(this.OrderForm.get('length').value),
      "height" : parseInt(this.OrderForm.get('height').value),
      "width" : parseInt(this.OrderForm.get('width').value),
      "bussinessName": this.nameDN,
      "costTotal" : parseInt(cost),
      "maKM": km,
    }
    return data;
  }

  nameDN: string = '';
  showMaKM: boolean = false;
  listPromotion: any[] = [];
  choosePromotionCompany(event: any){
    this.chooseMaKM = undefined;
    let id = event.substr(0, event.indexOf('/'));
    this.nameDN = event.slice(event.lastIndexOf('/') + 1);
    this.active = true;
    this.customerService.searchPromotion(this.token, id).subscribe(
      (res) => {
        this.active = false;
        this.listPromotion = res.data;
        if(this.listPromotion.length != 0){
          this.showMaKM = false;
        }
        else{
          this.showMaKM = true;
        }
      },
      (err) => {
        this.active = false;
        this.alertNotify('error', 'Đã xảy ra lỗi khi lấy dữ liệu')
      }
    )
  }

  //Biến lưu giá tiền
  superShip: any;
  giaoHangTietKiem: any;
  giaoHangNhanh: any;
  nameIdSuperShip: any;
  nameIdGiaoHangTietKiem: any;
  nameIdGiaoHangNhanh: any;

  Order: any;
  orderDetail: any;
  flaq = false;
  nextStep(): void{
    if(this.steps === 1){
      if(this.addressForm.valid){
        this.steps = 2;
        this.From = this.addressForm.get('addressFrom').value + ", " + this.NameSendWard + ", " + this.addressForm.get('sender_district').value;
        this.To = this.addressForm.get('addressTo').value + ", " + this.NameReceiverWard + ", " + this.addressForm.get('receiver_district').value;
      }
      else{
        this.checkValidForm(this.addressForm);
      }
    }
    else if(this.steps === 2){
        this.steps = 3;
    }
    else if(this.steps === 3){
      if(this.OrderForm.valid){
        this.active = true;
        this.steps = 4;
        let data = this.createFormSearchProvider();
          this.customerService.searchProvider(data).subscribe(
            (res) => {
              this.active = false;
              res.data.forEach(item => {
                if(item.SuperShip){
                  this.superShip = item.SuperShip.results[0];
                  this.nameIdSuperShip = item.id + '/' + item.name
                }
                else if(item.GiaoHangNhanh){
                  this.giaoHangNhanh = item.GiaoHangNhanh;
                  this.nameIdGiaoHangNhanh = item.id + '/' + item.name
                }
                else if(item.GiaoHangTietKiem){
                  this.giaoHangTietKiem = item.GiaoHangTietKiem;
                  this.nameIdGiaoHangTietKiem = item.id + '/' + item.name
                }
              })
            },
            (err) => {
              this.alertNotify('error', 'Đã xảy ra lỗi khi lấy dữ liệu')
              this.active = false;
            }
          )
      }
      else{
        this.checkValidForm(this.OrderForm);
      }
    }
    else if(this.steps === 4){
      if(this.doanhNghiepForm.valid){
        this.active = true;
        let data = this.createFormOrderService();
        this.customerService.orderService(data, this.token).subscribe(
          (res) => {
            this.Order = res.data;
            this.orderDetail = res.chiTietDonHang;
            this.active = false;
            this.alertNotify('success', 'Đặt đơn hàng thành công')
            this.steps = 5;
          },
          (err) => {
            this.alertNotify('error', 'Đặt đơn hàng không thành công')
            this.active = false;
          }
        )
      }
      else{
        this.checkValidForm(this.doanhNghiepForm);
      }
    }
    else if(this.steps === 5){
      let name = this.OrderForm.get('marchandiseName').value;
      if(this.choosePayment.valid){
        this.active = true;
        let type = this.choosePayment.get('payment').value;
        if(type === 'PayPal'){
          this.customerService.createPaymentOrders(this.token, this.Order._id, this.orderDetail._id, name, this.Order.tongTien ).subscribe(
            (res) => {
              this.alertNotify('success', 'Đơn hàng đang trong quá trình thanh toán');
              this.steps = 1;
              this.chooseService.reset();
              this.From = '';
              this.To = '';
              this.Send = '';
              this.Receiver = '';
              var w = window.open(res.url, '_blank', 'location = yes, height = 570, width = 520, scrollbars = yes, status = yes');
              var s = setInterval(() => {
                if(w.closed){
                  clearInterval(s);
                  this.active = false;
                }
              }, 500)
            },
            (err) => {
              this.active = false;
              this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình thanh toán');
            }
          );
        }
        else{
          this.customerService.createPaymentVNPay(this.token, this.Order._id, this.orderDetail._id, name, this.Order.tongTien).subscribe(
            (res) => {
              this.alertNotify('success', 'Đơn hàng đang trong quá trình thanh toán');
              this.steps = 1;
              this.chooseService.reset();
              this.From = '';
              this.To = '';
              this.Send = '';
              this.Receiver = '';
              var w = window.open(res.data, '_blank', 'location = yes, height = 570, width = 520, scrollbars = yes, status = yes');
              var s = setInterval(() => {
                if(w.closed){
                  clearInterval(s);
                  this.active = false;
                }
              }, 500)
            },
            (err) => {
              this.active = false;
              this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình thanh toán');
            }
          )
        }
      }
      else{
        this.checkValidForm(this.choosePayment);
      }
    }
  }

  cancelOrder(){
    this.active = true;
    this.customerService.cancelOrder(this.token, this.Order._id).subscribe(
      (res) => {
        this.active = false;
        this.steps -= 1;
        this.alertNotify('success', 'Hủy đơn hàng thành công');
      },
      (err) => {
        this.active = false;
        this.alertNotify('error', 'Đã xảy ra lỗi trong quá trình hủy đơn hàng');
      }
    )
  }

  backStep(): void{
    if(this.steps == 2){
      this.steps = 1;
      this.From = '';
      this.To = '';
    }
    else
      this.steps -= 1;
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

  getUser(): void{
    this.customerService.getUserDetail(this.token).subscribe(
      (response) => {
        this.user = response;
        this.OrderForm.patchValue({
          soDienThoai: this.user.soDienThoai,
          hoTen: this.user.hoVaTen,
          email: this.user.email
        })
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
