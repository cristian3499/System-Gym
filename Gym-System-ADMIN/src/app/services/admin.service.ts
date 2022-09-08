import { Injectable } from '@angular/core';
import { GlobalConexion } from './Global'
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(private _http:HttpClient) {
    this.url = GlobalConexion.url
  }

  loginAdmin(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'loginAdmin', data, {headers :  headers})
  }

  getToken(){
    return localStorage.getItem('token')
  }

  public isAuthenticated(allowRoles :  string[]) : boolean{
    const token = localStorage.getItem('token')

    if (!token) {
      return false
    }

    try {
    const helper = new JwtHelperService();
    var decodedToken = helper.decodeToken(token);

    /*
    if (helper.isTokenExpired(token)) {
      localStorage.clear();
      return false;
    }
    */

    if (!decodedToken) {
      localStorage.removeItem('token')
      return false
    }

    } catch (error) {
      localStorage.removeItem('token')
      return false
    }

    return allowRoles.includes(decodedToken['rol'])
  }

  getClients(type, filter, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.get(this.url + 'getClients/' + type + '/' + filter, {headers :  headers})
  }

  deleteClient(id, token):Observable<any>{
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'authorization' : token});
    return this._http.delete(this.url + 'deleteClient/' + id, {headers :  headers})
  }
}
