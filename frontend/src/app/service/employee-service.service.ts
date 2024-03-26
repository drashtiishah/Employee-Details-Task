import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private _http: HttpClient) { }

  public baseUri: string = 'http://localhost:4000/api';

  //Create
  public createEmployee(data: any): Observable<any>{
    let url = `${this.baseUri}`;
    return this._http.post(url, data);
  }

  //GetAll
  public getAllEmployees(){
    return this._http.get(`${this.baseUri}`);
  }
}
