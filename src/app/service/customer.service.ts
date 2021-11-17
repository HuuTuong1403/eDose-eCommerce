import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = "https://edosecompany-server.herokuapp.com/";
  private local = "http://localhost:3000/";
  constructor(private http: HttpClient,
              private cookieService: CookieService) {}

  signIn(formData: FormData): Observable<any>{
    return this.http.post<any>(this.url + 'customer/signin' , formData);
  }

  signUp(formdata: FormData): Observable<any>{
    return this.http.post<any>(this.url + 'customer/signup', formdata);
  }

  deleteToken(){
    this.cookieService.delete('token_c', '/');
  }

  getUserPayLoad(){
    var user = this.cookieService.get('token_c');
    if(user){
      return user;
    }
    else
      return null;
  }
  isLoggedIn(){
    var user = this.getUserPayLoad();
    if(user){
      return true;
    }
    else{
      return false;
    }
  }

  getUserDetail(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'customer/infor-details', { headers: headers})
  }

  updateUserDetails(formData: FormData, token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.put<any>(this.url + 'customer/infor-details', formData, { headers: headers });
  }

  changePass(formData: FormData, token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.put<any>(this.url + 'customer/change-password', formData, { headers: headers });
  }

  getDistrictInHoChiMinhGHN(): Observable<any>{
    const data = {"province_id": 202};
    const headers = new HttpHeaders({ "Token": "0548ae68-8f20-11eb-9035-ae038bcc764b" });
    return this.http.post<any[]>("https://online-gateway.ghn.vn/shiip/public-api/master-data/district", data, { headers: headers });
  }

  getWardInDistrictGHN(district_id: string): Observable<any>{
    const headers = new HttpHeaders({ "Token": "0548ae68-8f20-11eb-9035-ae038bcc764b" });
    return this.http.get<any[]>("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward", { headers: headers, params: { district_id }});
  }

  searchProvider(data: any): Observable<any>{
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<any[]>(this.url + 'customer/orders/search-provider', data, { headers: headers });
  }

  orderService(data: any, token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.post<any>(this.url + 'customer/orders/order-service', data, { headers: headers });
  }

  createPaymentOrders(token: string, IDBill: string, IDBillDetail: string, marchandiseName: string, totalCost: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'customer/orders/create-payment', { headers: headers, params: { IDBill: IDBill, IDBillDetail: IDBillDetail, marchandiseName: marchandiseName, totalCost: totalCost } });
  }

  getListOrder(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'customer/show-order-details', { headers: headers });
  }

  getRevenueBill(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'customer/revenue-bill', { headers: headers });
  }

  getStatisticBill(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'customer/statistic-bill', { headers: headers })
  }

  getEmailForgotPassword(email: string): Observable<any>{
    return this.http.get<any>(this.url + 'customer/forget-password', { params: { email } });
  }

  changePassForgot(data: FormData): Observable<any>{
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.put<any>(this.url + 'customer/forget-password', data, { headers: headers });
  }

  createPaymentVNPay(token: string, IDBill: string, IDBillDetail: string, marchandiseName: string, totalCost: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'customer/create-payment-vnpay', { headers: headers, params: { IDBill: IDBill, IDBillDetail: IDBillDetail, marchandiseName: marchandiseName, totalCost: totalCost } });
  }

  searchPromotion(token: string, idDoanhNghiep: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'customer/search-Promotion', { headers: headers, params: { idDoanhNghiep: idDoanhNghiep } })
  }

  cancelOrder(token: string, IDBill: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'customer/orders/cancel-order-service', { headers: headers, params: { IDBill: IDBill } })
  }
}
