import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = "https://edosecompany-server.herokuapp.com/";
  private local = "http://localhost:3000/";

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }


  showBusinessDetail(token: string, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'admin/infor-details-business', { headers: headers, params: { _id: id } });
  }

  acceptReconciliation(token: string, IDBussiness: string, businessName: string, StartDate: string, EndDate: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.get<any>(this.url + 'admin/accept-reconciliation', { headers: headers, params: { IDBussiness: IDBussiness, bussinessName: businessName, StartDate: StartDate, EndDate: EndDate}});
  }

  getReconciling(token: string, IDBussiness: string, bussinessName: string, start: string, end: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token});
    return this.http.get<any>(this.url + 'admin/Reconciling', { headers: headers, params: { IDBussiness: IDBussiness ,bussinessName: bussinessName, StartDate: start, EndDate: end}})
  }

  getRevenueServicePackage(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'admin/revenue-service-package', { headers: headers })
  }

  getTrackRevenue(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'admin/track-revenue', { headers: headers })
  }

  deleteServicePackage(token: string, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.delete<any>(this.url + 'admin/service-packages/' + id, { headers: headers });
  }

  addServicePackage(token: string, data: FormData): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.post<any>(this.url + 'admin/create-service-package', data, { headers: headers });
  }

  updateServicePackage(token: string, data: FormData, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.put<any>(this.url + 'admin/service-packages/' + id, data, { headers: headers });
  }

  getListServicePackage(token: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any>(this.url + 'admin/service-packages', { headers: headers });
  }

  deleteUser(token: string, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.delete<any>(this.url + 'admin/usermanagement/' + id, { headers: headers });
  }

  unBlockUser(token: string, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.put<any>(this.url + 'admin/usermanagement/' + id + '/unblock', '', { headers: headers });
  }

  blockUser(token: string, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.put<any>(this.url + 'admin/usermanagement/' + id + '/block', '', { headers: headers });
  }

  getUsers(token: string): Observable<any[]>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any[]>(this.url + 'admin/usermanagement', { headers: headers });
  }

  deniedBusinessApproval(token: string, id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.put<any>(this.url + 'admin/business-account-approval/' + id + '/DeniedApproval', '',  { headers: headers });
  }

  businessAccountApproval(token: string ,id: string): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.put<any>(this.url + 'admin/business-account-approval/' + id + '/approval', '',  { headers: headers });
  }

  getListBusiness(token: string): Observable<any[]>{
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<any[]>(this.url + 'admin/list-business', { headers: headers });
  }

  signIn(formData: FormData): Observable<any>{
    return this.http.post<any>(this.url + 'admin/signin', formData);
  }

  getToken(): string{
    return this.cookieService.get('token_a');
  }

  deleteToken(){
    this.cookieService.delete('token_a', '/');
  }

  getAdminPayLoad(){
    var admin = this.cookieService.get('token_a');
    if(admin){
      return admin;
    }
    else
      return null;
  }
  isLoggedIn(){
    var admin = this.getAdminPayLoad();
    if(admin){
      return true;
    }
    else{
      return false;
    }
  }
}
