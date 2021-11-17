import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private url = "https://edosecompany-server.herokuapp.com/";
  private local = "http://localhost:3000/";

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }


  getReconciling(token: string, businessName: string, start: string, end: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.get<any>(this.url + 'business/Reconciling', { headers: headers, params: { bussinessName: businessName, StartDate: start, EndDate: end}})
  }

  acceptReconciliation(token: string, businessName: string, StartDate: string, EndDate: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.get<any>(this.url + 'business/accept-reconciliation', { headers: headers, params: { bussinessName: businessName, StartDate: StartDate, EndDate: EndDate}});
  }

  getEmailForgotPass(email: string): Observable<any>{
    return this.http.get<any>(this.url + 'business/forget-password', { params: { email }});
  }

  changePassForgot(data: FormData): Observable<any>{
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.put<any>(this.url + 'business/forget-password', data, { headers: headers });
  }

  getRevenueBill(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.get<any>(this.url + 'business/revenue-bill', { headers: headers });
  }

  getSumOrder(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.get<any>(this.url + 'business/count-bill', { headers: headers });
  }

  processOrder(token: string, IDBill: string, trangThai: string, IDBillDetail: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'business/process-order', { headers: headers, params: { IDBill: IDBill, trangThai: trangThai, IDBillDetail: IDBillDetail } });
  }

  getListOrders(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'business/show-orders-details-list', { headers: headers });
  }

  cancelPackageIsRegister(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.put<any>(this.url + 'business/service-package/cancel-service-package', '', { headers: headers });
  }

  getPackageIsRegister(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'business/service-package/show-detail', { headers: headers })
  }

  approvalBusiness(formdata: FormData, token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.put<any>(this.url + 'business/verify-business', formdata, { headers: headers });
  }

  uploadLogo(data: FormData): Observable<any>{
    return this.http.post<any>('https://api.cloudinary.com/v1_1/university-of-education-technology/image/upload', data);
  }

  deletePromotion(token: string, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.delete<any>(this.url + 'business/promotion/' + id, { headers: headers });
  }

  updatePromotion(data: FormData, token: string, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.put<any>(this.url + 'business/promotion/' + id, data, { headers: headers });
  }

  getPromotion(token: string): Observable<any[]>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.get<any[]>(this.url + 'business/promotion', { headers: headers });
  }

  addPromotion(data: FormData, token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.post<any>(this.url + 'business/promotion', data, { headers: headers });
  }

  changePassBusiness(tenDN: string, data: FormData,token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.put<any>(this.url + 'business/change-password/' + tenDN, data,{ headers: headers })
  }

  updateInforBusiness(data: FormData, token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token, 'Content-Type': 'application/json'});
    return this.http.put<any>(this.url + 'business/infor-details', data, { headers: headers })
  }

  getInforBusiness(token: string): Observable<any>{
    const headers = new HttpHeaders({'Authorization': token});
    return this.http.get<any>(this.url + 'business/infor-details', { headers: headers});
  }

  priceDeClareKG(formData: FormData, token: string): Observable<any>{
    const headers = new HttpHeaders({'Authorization': token});
    return this.http.post<any>(this.url + 'business/price-declaration/kg', formData, { headers: headers});
  }

  priceDeClareKM(formData: FormData, token: string): Observable<any>{
    const headers = new HttpHeaders({'Authorization': token});
    return this.http.post<any>(this.url + 'business/price-declaration/km', formData, { headers: headers});
  }

  getListLoaiHangHoa(token: string): Observable<any[]>{
    const headers = new HttpHeaders({'Authorization': token});
    return this.http.get<any[]>(this.url + 'business/price-declaration', { headers: headers });
  }

  getDistrictInHoChiMinhGHN(): Observable<any>{
    const data = {"province_id": 202};
    const headers = new HttpHeaders({"Token": "0548ae68-8f20-11eb-9035-ae038bcc764b"});
    return this.http.post<any[]>("https://online-gateway.ghn.vn/shiip/public-api/master-data/district", data, { headers: headers });
  }

  registerPackageService(token: string, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.put<any>(this.url + 'business/service-packages/' + id, '', { headers: headers })
  }

  paymentPackageService(token: string, maGoiDV: string, tenGoiDV: string, totalCost: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url   + 'business/service-packages/create-payment/', { headers: headers, params: { maGoiDV: maGoiDV, tenGoiDV: tenGoiDV, totalCost: totalCost } });
  }

  createPaymentVNPay(token: string, maGoiDV: string, tenGoiDV: string, totalCost: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'business/create-payment-vnpay', { headers: headers, params: { maGoiDV: maGoiDV, tenGoiDV: tenGoiDV, totalCost: totalCost } })
  }

  getPackageService():  Observable<any[]>{
    return this.http.get<any[]>(this.url + 'business/service-packages');
  }

  signIn(formData: FormData): Observable<any>{
    return this.http.post<any>(this.url + 'business/signin', formData);
  }

  signUp(formData: FormData): Observable<any>{
    return this.http.post<any>(this.url + 'business/signup', formData);
  }

  deleteToken(){
    this.cookieService.delete('token_b', '/');
  }

  getBussinessPayLoad(){
    var business = this.cookieService.get('token_b');
    if(business){
      return business;
    }
    else
      return null;
  }
  isLoggedIn(){
    var business = this.getBussinessPayLoad();
    if(business){
      return true;
    }
    else{
      return false;
    }
  }
}
